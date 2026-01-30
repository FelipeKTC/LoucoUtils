import config from "../../config"


register("Chat", (event) => {
  if(!config.GolemParticles) return;
  var formattedMessage = ChatLib.getChatMessage(event, true);
  if(formattedMessage.includes("&r&c&lThe ground begins to shake as an Endstone Protector rises from below!&r")){
          setTimeout(() => {
              ChatLib.command("pq off")
          }, 300);
        
		  }
		
	if(formattedMessage.includes("&r&f                    &r&6&lENDSTONE PROTECTOR DOWN!&r")){
          setTimeout(() => {
                switch(config.GolemDefaultParticles){
                    case 0:
                        ChatLib.command("pq OFF")
                        break;
                    case 1:
                        ChatLib.command("pq LOW")
                        break;
                    case 2:
                        ChatLib.command("pq MEDIUM")
                        break;
                    case 3: 
                        ChatLib.command("pq HIGH")
                        break;
                    case 4: 
                        ChatLib.command("pq EXTREME")   
                        break;
                }

          }, 300);
        
  		}
  })