import config from '../../config'

register("Chat", (event) => {
    if(!config.ComebackMessage) return
    var formattedMessage = ChatLib.getChatMessage(event, true);
    if(formattedMessage.includes("&cOops! You are not on SkyBlock so we couldn't warp you!&r")){
        setTimeout(() => {
            ChatLib.command("l")
            ChatLib.command("pc Oops! You are not on SkyBlock so we couldn't warp you!")
        }, 100);
        if(!config.AutoComeback) return
        setTimeout(() => {
            ChatLib.command("skyblock")
        }, 3500);
    }
})

register("Chat", (event) => {
    if(!config.ComebackMessage) return
    var formattedMessage = ChatLib.getChatMessage(event, true);
    if(formattedMessage.includes("&cYou were kicked while joining that server!&r")){
        setTimeout(() => {
            ChatLib.command("l")
            ChatLib.command("pc You were kicked while joining that server!")
        }, 100);
        if(!config.AutoComeback) return
        setTimeout(() => {
            ChatLib.command("skyblock")
        }, 3500);
    }
})
