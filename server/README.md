+```bash
+dotnet ef --project ./Melodiy.Features migrations add auth_tables --startup-project ./Melodiy.Web -o Common/Data/Migrations
+```

# Contracts
- Contracts/Requests = Input Controller Requests these should be validated by Fluent validation
- Contracts/Models = Internally used objects between services the controller should never return a model class. Models do not have to be suffixed with model unless its the top most model e.g PlaylistModel may have a PlaylistTrack or a PlaylistOwner object the child models don't have to be named PlaylistTrackModel (this may bite me later).
- Contracts/Responses = API Output this is what the API consumer will receiver. Use mapperly to map the types (preferred for complex objects) or do it manually. Responses can be directly outputted by a service/mediator or any internal requests if there isn't a need to share extra data that would live in a DTO.