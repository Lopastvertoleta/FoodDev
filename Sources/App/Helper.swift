//
//  Helper.swift
//  FoodDevVapor
//
//  Created by Taras Parkhomenko on 26/01/2017.
//
//

import Foundation
import Auth

class Helper {
    class func generateToken() -> String {
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        
        return (0..<128).reduce("") { (result, index) -> String in
            return result + String(letters.characters.array[Int.random(min: 0, max: letters.count-1)])
        }
    }
    
    class func checkAuthentication(user: User.Type, token: AccessToken) -> Bool {
        guard let _ = try? user.authenticate(credentials: token) else { return false }
        
        return true
    }
}
