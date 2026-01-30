import config from '../../config'

register("Chat", (event) => {
  if(!config.VanqAlert) return;
  var formattedMessage = ChatLib.getChatMessage(event, true);
  if(formattedMessage.includes("&r&aA &r&cVanquisher &r&ais spawning nearby!&r")){
          setTimeout(() => {
				      ChatLib.command("patcher sendcoords Vanquisher!")
          }, 300);

      }
  })