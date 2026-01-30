import config from "../../config"

const createChatEvent = (chatMsg, cmd) =>{
    register("Chat", (event) => {
        if(!config.FishingMsg) return;
        var formattedMessage = ChatLib.getChatMessage(event, true);
        if(formattedMessage==(chatMsg)){	
                    setTimeout(() => {
                          ChatLib.command(cmd)
                    }, 300);
                
            }
        })
        
    }
    
    createChatEvent("&r&c&lYou hear a massive rumble as Thunder emerges.&r", "pc ゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜███゜█゜゜█゜█゜█゜█゜゜゜█゜██゜゜███゜████゜█゜゜゜█゜゜█゜゜█゜█゜█゜██゜゜█゜█゜█゜█゜゜゜█゜゜█゜█゜゜゜█゜゜████゜█゜█゜█゜█゜█゜█゜█゜███゜███゜゜█゜゜゜█゜゜█゜゜█゜█゜█゜█゜゜██゜█゜█゜█゜゜゜█゜█゜゜゜゜゜゜█゜゜█゜゜█゜███゜█゜゜゜█゜██゜゜███゜█゜゜█゜█゜゜゜゜゜");
    
    createChatEvent("&r&c&lYou have angered a legendary creature... Lord Jawbus has arrived.&r", "pc ゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜█゜゜██゜゜█゜゜゜█゜███゜゜█゜゜█゜████゜█゜゜゜゜゜゜█゜█゜゜█゜█゜█゜█゜█゜゜█゜█゜゜█゜█゜゜゜゜█゜゜゜゜゜゜█゜████゜█゜█゜█゜███゜゜█゜゜█゜████゜█゜゜゜█゜゜█゜█゜゜█゜█゜█゜█゜█゜゜█゜█゜゜█゜゜゜゜█゜゜゜゜゜████゜█゜゜█゜゜███゜゜███゜゜████゜████゜█゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜゜");
    
    createChatEvent("&r&aHide no longer, a Great White Shark has tracked your scent and thirsts for your blood!&r", "pc Great White Shark!");
    
    createChatEvent("&r&aThe spirit of a long lost Phantom Fisher has come to haunt you.&r", "pc Phantom Fisher!");
        
    createChatEvent("&r&aThis can't be! The manifestation of death himself!&r", "pc Grim Reaper!");
        
    createChatEvent("&r&aThe Sea Emperor arises from the depths.&r", "pc The Sea Emperor!");
        
    createChatEvent("&r&aThe Water Hydra has come to test your strength.&r", "pc The Water Hydra!");
        
    createChatEvent("&r&aWhat is this creature!?&r", "pc Yeti!");
    
    createChatEvent("&r&aThe Grinch stole Jerry's Gifts...&r", "pc The Grinch!");
    
    createChatEvent("&r&aYou found a forgotten Nutcracker laying beneath the ice.&r", "pc Nutcracker!");
    
    createChatEvent("&r&aWOAH! A Plhlegblast appeared.&r", "pc SQUID SQUID SQUID SQUID SQUID SQUID SQUID SQUID SQUID SQUID SQUID SQUID");

    createChatEvent("&r&c&lWOAH! &r&cA &r&4Reindrake &r&cwas summoned from the depths!&r", "pc Reindrake!");

