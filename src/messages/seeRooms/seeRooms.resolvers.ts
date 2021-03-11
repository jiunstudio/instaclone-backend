import { Resolvers } from "../../types"
import { protectedResolver } from "../../users/users.utils"

const resolvers: Resolvers = {
    Query: {
        seeRooms: protectedResolver((_, __, { client, loggedInUser }) => {
            return client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            })
        })
    }
}

export default resolvers