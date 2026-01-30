
import config from "./config"

register('command', () => {
    config.openGUI()
}).setCommandName('loucoutils').setAliases('lu')

const floors = [
    { prefix: 'f', type: 'CATACOMBS_FLOOR' },
    { prefix: 'm', type: 'CATACOMBS_FLOOR' }
];

floors.forEach(floor => {
    for (let i = 1; i <= 7; i++) {
        const floorLevel = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'][i - 1];
        const commandType = floor.prefix === 'm' ? `MASTER_${floor.type}` : floor.type;
        const commandName = `${floor.prefix}${i}`;

        register('command', () => {
            ChatLib.command(`joindungeon ${commandType}_${floorLevel}`);
        })
        .setCommandName(commandName);
    }
});



register('command', () => {
    if(config.AutoRequeue){
            config.AutoRequeue = false;
            ChatLib.chat('&cAutoWarp &4Disabled.');
    }else{
            config.AutoRequeue = true;
            ChatLib.chat('&cAutoWarp &2Enabled.');
    }
}).setCommandName('autowarp').setAliases('aw')

register('command', () => {
    setTimeout(() => {
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
        ChatLib.command(" ")
    }, 100);
}).setCommandName('sendlimbo').setAliases('goafk')

