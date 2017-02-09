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
        return try MenuItem.query().run().makeJSON()
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
        try request.session().data["remembered"] = Node.bool(true)
        print(try request.session().data)
        drop.storage["remembered"] = Node.bool(true)
        return try user.makeJSON()
    } catch {
        throw Abort.serverError
    }
}

drop.get("checkAuthentication") { (request) in
    
    guard let session = try? request.session(), let remembered = session.data["remembered"]?.bool
        else { throw Abort.custom(status: .forbidden, message: "YOU SHALL NOT PASS") }
    
//    guard let rememberedWrap = drop.storage["remembered"] as? Node, let remembered = rememberedWrap.bool
//        else { throw Abort.custom(status: .forbidden, message: "") }
    
    if remembered {
        return JSON.init(try! [ "success": true ].makeNode())
    } else {
        throw Abort.custom(status: .forbidden, message: "YOU SHALL NOT PASS")
    }
}


drop.get("testValidation") { (request) in
    guard let token = request.headers["Authentication"] else { throw Abort.badRequest }
    
    do {
        let user = try User.authenticate(credentials: AccessToken(string: token))
        
        return JSON(try user.makeNode())
    } catch {
        throw Abort.serverError
    }
}

drop.preparations.append(MenuItem.self)
drop.preparations.append(User.self)

drop.run()
