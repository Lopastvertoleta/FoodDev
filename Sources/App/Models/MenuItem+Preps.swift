//
//  MenuItem+Preps.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 13/01/2017.
//
//

import Vapor
import Fluent
import Foundation

extension MenuItem {
    static func prepare(_ database: Database) throws {
        try database.create("menuitems") { posts in
            posts.id()
            posts.string("title")
            posts.string("description")
            posts.string("imageURL")
        }
    }
    
    static func revert(_ database: Database) throws {
        try database.delete("menuitems")
    }
}
