import Vapor
import VaporPostgreSQL
import Auth

let auth = AuthMiddleware(user: User.self)


let drop = Droplet()

drop.middleware.append(auth)
try? drop.addProvider(VaporPostgreSQL.Provider)

drop.get { req in
    return try drop.view.make("../../Public/js/index_prod.html")
}

drop.get("psqlprovider") { (request) in
    
    let post = Post(content: "content");
    
    return "something"
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

drop.resource("posts", PostController())

drop.preparations.append(MenuItem.self)
drop.preparations.append(User.self)

drop.run()
