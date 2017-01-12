import Vapor
import PostgreSQL

let database = PostgreSQL.Database(
    host: "ec2-107-20-193-74.compute-1.amazonaws.com",
    port: "5432",
    dbname: "do1kqunsc5rmr",
    user: "mjzqqlxsawzmtf",
    password: "03925e217bcf123cb8a2e0ea66fcf91f5a356fef2d191e99892c3055f741a89a"
)

do {
    let connection = try database.makeConnection()
} catch DatabaseError.cannotEstablishConnection(let reason) {
    print(reason)
}

let block = {
    (variable:Int) -> Void in
    print(variable)
}

let drop = Droplet()

drop.get { req in
    return try drop.view.make("welcome", [
    	"message": drop.localization[req.lang, "welcome", "title"]
    ])
}

drop.get("psql") { (request) in
    do {
        let connection = try database.makeConnection()
        try database.execute("CREATE TABLE account(user_id serial PRIMARY KEY, username VARCHAR (50)UNIQUE NOT NULL,password VARCHAR (50) NOT NULL,email VARCHAR (355) UNIQUE NOT NULL,created_on TIMESTAMP NOT NULL,last_login TIMESTAMP)")
        return "success"
    } catch DatabaseError.cannotEstablishConnection(let reason) {
        return reason
    }
}

drop.resource("posts", PostController())

drop.run()
