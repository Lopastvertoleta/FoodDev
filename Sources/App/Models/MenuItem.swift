//
//  MenuItem.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 13/01/2017.
//
//

import Vapor
import Fluent
import Foundation

final class MenuItem:Model {
    var id: Node?
    var title: String
    var description: String
    var imageURL: String
    
    
    init(title: String, description:String, image:String) {
        self.title = title
        self.description = description
        self.imageURL = image
    }
    
    init(node: Node, in context: Context) throws {
        id = try node.extract("id")
        title = try node.extract("title")
        description = try node.extract("description")
        imageURL = try node.extract("imageurl")
    }
    
    func makeNode(context: Context) throws -> Node {
        return try Node(node: [
            "id": id,
            "title": title,
            "description": description,
            "imageURL": imageURL
            ])
    }
}
