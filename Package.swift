import PackageDescription

let package = Package(
    name: "FoodDevVapor",
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", Version(1, 5, 6)),
        .Package(url: "https://github.com/vapor/postgresql-provider.git", majorVersion: 1, minor: 1)
    ],
    exclude: [
        "Config",
        "Database",
        "Localization",
        "Public",
        "Resources",
        "Tests",
    ]
)

