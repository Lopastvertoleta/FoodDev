//
//  User.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 13/01/2017.
//
//

import Vapor
import Fluent
import Foundation

extension User {
    static func prepare(_ database: Database) throws {
        try database.create("users") { users in
            users.id()
            users.string("name")
            users.string("login")
            users.string("email")
            users.string("password")
            users.string("access_token")
        }
    }
    
    static func revert(_ database: Database) throws {
        try database.delete("users")
    }
}
