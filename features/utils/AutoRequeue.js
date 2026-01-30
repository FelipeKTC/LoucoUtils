import config from "../../config"

let AutoRequeueTime = parseInt(config.AutoRequeueTime);
if(AutoRequeueTime<=100){
    AutoRequeueTime = 100;
}
if(AutoRequeueTime >=10000){
    AutoRequeueTime = 10000;
}
register("Chat", (event) => {
    if(!config.AutoRequeue) return;
    const formattedMessage = ChatLib.getChatMessage(event, true);
    if(formattedMessage.includes("&r&7Click &e&lHERE &7to re-queue into")){
        setTimeout(() => {
            ChatLib.command("instancerequeue")
        },AutoRequeueTime);
  
    }
})

register("Chat", (event) => {
    if(!config.AutoAutoRequeue) return;
    const formattedMessage = ChatLib.getChatMessage(event, true);
    if((formattedMessage.includes("&rdowntime")||formattedMessage.includes("&rdt")||formattedMessage.includes("&r!dt"))&&(formattedMessage.includes("&r&9Party &8>"))){
        config.AutoRequeue = false 
        ChatLib.chat('&cAutoWarp &4Disabled.');
    }
})
register("Chat", (event) => {
    if(config.AutoAutoRequeue) return;
    const formattedMessage = ChatLib.getChatMessage(event, true);
    if(formattedMessage.includes("&r&eentered")){
        config.AutoRequeue = true
        ChatLib.chat('&cAutoWarp &2Enabled.');
    }
})