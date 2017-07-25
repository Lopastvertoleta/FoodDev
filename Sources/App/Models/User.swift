//
//  User.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 13/01/2017.
//
//

import Vapor
import Auth
import TurnstileCrypto

final class User: Model {
    var id: Node?
    var name: String
    var login: String
    var email: String
    var password: String
    var accessToken: String
    
    init(name: String, email:String, login: String, password: String, accessToken: String) {
        self.name = name
        self.email = email
        self.login = login
        self.password = password
        self.accessToken = accessToken
    }
    
    init(node: Node, in context: Context) throws {
        id = try node.extract("id")
        name = try node.extract("name")
        login = try node.extract("login")
        email = try node.extract("email")
        password = try node.extract("password")
        accessToken = try node.extract("access_token")
    }
    
    func makeNode(context: Context) throws -> Node {
        return try Node(node: [
            "id": id,
            "name": name,
            "login": login,
            "email": email,
            "password": password,
            "access_token": accessToken
        ])
    }
}

extension User: Auth.User {
    static func authenticate(credentials: Credentials) throws -> User {
        switch credentials {
        case let emailPassword as APIKey:
            let email = emailPassword.id
            let password = emailPassword.secret
            
            guard let user = try User.query().filter("email", email).first() else {
                throw Abort.custom(status: .notFound, message: "User with this email was not found")
            }
            if (user.password != password) {
                throw Abort.custom(status: .forbidden, message: "Invalid password")
            }
            
            return user
        case let accessToken as AccessToken:
            guard let user = try User.query().filter("access_token", accessToken.string).first() else {
                throw Abort.custom(status: .forbidden, message: "Invalid access token.")
            }
            
            return user
        default:
            let type = type(of: credentials)
            throw Abort.custom(status: .forbidden, message: "Unsupported credential type: \(type).")
        }
    }
    
    static func authenticateViaFacebook(facebookResponse: JSON) throws -> User {
        guard let email = facebookResponse["email"]?.string, let name = facebookResponse["name"]?.string else {
            throw Abort.badRequest
        }
        if let user = try? User.query().filter("email", email).first(), let userUnwrapped = user {
            return userUnwrapped
        } else {
            let token = try drop.hash.make(Helper.generateToken())
            var user =  User(name: name, email: email, login: email, password: "234234234", accessToken: token)
            try user.save()
            
            return user
        }
    }
    
    static func register(credentials: Credentials) throws -> Auth.User {
        
        throw Abort.notFound
    }
}
