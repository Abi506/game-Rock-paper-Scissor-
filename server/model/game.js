const {Schema,model}=require("mongoose")

const gameDataSchema=Schema({
    winner:{
        type:String
    },
    player1:{
        score:Number,
        name:String
    },
    player2:{
        score:Number,
        name:String
    }
    
})


const GameData=model("GameData",gameDataSchema)

module.exports=GameData