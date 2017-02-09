//
//  Helper.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 26/01/2017.
//
//

import Foundation

class Helper {
    class func generateToken() -> String {
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        
        return (0..<128).reduce("") { (result, index) -> String in
            return result + String(letters.characters.array[Int.random(min: 0, max: letters.count-1)])
        }
    }
}
