import Vapor
import VaporPostgreSQL
import Auth
import Sessions

let auth = AuthMiddleware(user: User.self)

let memory = MemorySessions()
let sessions = SessionsMiddleware(sessions: memory)

let drop = Droplet()

drop.middleware.append(auth)
drop.middleware.append(sessions)
try? drop.addProvider(VaporPostgreSQL.Provider)

drop.get { req in
    return try drop.view.make("../../Public/js/index_prod.html")
}


drop.get("menuItems") { (request) in
    do {
        guard let token = request.auth.header?.bearer
            else { throw Abort.custom(status: .forbidden, message: "No token found") }
        
        if Helper.checkAuthentication(user: User.self, token: token) {
            
            let limit = request.parameters["limit"]?.int ?? 20
            let offset = request.parameters["offset"]?.int ?? 0
            
            return try MenuItem
                .query()
                .sort("id", .descending)
                .limit(limit, withOffset: offset)
                .run()
                .makeJSON()
            
        } else {
            throw Abort.custom(status: .forbidden, message: "Invalid token")
        }
    } catch {
        throw Abort.serverError
    }
    
}

drop.post("menuItems") { (request) in
    guard let menuitem = request.json,
    let title = menuitem["title"]?.string,
    let description = menuitem["description"]?.string,
    let imageURL = menuitem["imageURL"]?.string
        else { throw Abort.badRequest }
    
    do {
        var menuItem = MenuItem(title: title, description: description, image: imageURL)
        try menuItem.save()
        let menuItemJSON = try menuItem.makeJSON()
        return menuItemJSON
    } catch {
        print(error)
        throw Abort.serverError
    }
}

drop.post("users") { (request) in
    guard let user = request.json,
    let name = user["name"]?.string,
    let login = user["login"]?.string,
    let password = user["password"]?.string,
    let email = user["email"]?.string
        else { throw Abort.badRequest }
    
    if password.count < 8 { throw Abort.badRequest }
    
    do {
        let token = try drop.hash.make(Helper.generateToken())
        var user = User(name: name, email: email, login: login, password: password, accessToken: token)
        
        try user.save()
        
        return try user.makeJSON()
    } catch {
        print(error)
        throw Abort.serverError
    }
}

drop.post("login") { (request) in
    guard let authData = request.json,
    let email = authData["email"]?.string,
    let password = authData["password"]?.string
        else { throw Abort.badRequest }
    
    do {
        var user = try User.authenticate(credentials: APIKey(id: email, secret: password))
        user.accessToken = try drop.hash.make(Helper.generateToken())
        try user.save()
        
        let data = ["remembered": Node.bool(true), "token": Node.string(user.accessToken)]
        
        try request.session().data = try data.makeNode()

        return try user.makeJSON()
    } catch {
        throw Abort.serverError
    }
}

drop.post("facebookLogin") { (request) in
    guard let data = request.json,
    let facebookToken = data["token"]?.string
        else { throw Abort.badRequest }
    
    do {
        let facebookResponse = try drop.client.get("https://graph.facebook.com/me?access_token=\(facebookToken)")
        
        guard let uid = facebookResponse.realJSON?["id"]?.string else { throw Abort.badRequest }
        
        let anotherFacebookResponse = try drop.client.get(
            "https://graph.facebook.com/\(uid)",
            query: [
                "access_token": facebookToken,
                "fields": "name, email, picture"
            ])
        guard let authJSON = anotherFacebookResponse.realJSON else { throw Abort.badRequest }
//        throw Abort.badRequest
        return try User.authenticateViaFacebook(facebookResponse: authJSON)
    } catch {
        throw Abort.badRequest
    }
}

drop.get("currentUser") { (request) in
    guard let token = request.auth.header?.bearer
        else { throw Abort.custom(status: .forbidden, message: "No token found") }
    
    guard let user = try? User.authenticate(credentials: token)
        else { throw Abort.custom(status: .forbidden, message: "Invalid token") }
    
    return try user.makeJSON()
}

drop.get("checkAuthentication") { (request) in
    guard let session = try? request.session(), let remembered = session.data["remembered"]?.bool
        else { throw Abort.badRequest }
    
    if remembered {
        return JSON(session.data)
    } else {
        throw Abort.badRequest
    }
}
drop.preparations.append(MenuItem.self)
drop.preparations.append(User.self)


drop.run()
