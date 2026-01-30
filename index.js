
import './commands'
import './config'

import './features/fishing/fishingMessages'
import './features/utils/AutoRequeue'
import './features/utils/Comeback'
import './features/utils/FallingBlocks'
import './features/utils/EventListener'
import './features/utils/Function'
import './features/waypoints/Waypoint'
import './features/utils/GolemParticles'
import './features/utils/VanqAlert'
import '../Vigilance/index'
import { initializeEventListeners, updateEventListeners } from "./features/utils/EventListener";
import config from './config'
initializeEventListeners();


register("command", (...args) => {
    const subCommand = args[0] == undefined ? undefined : args[0].toLowerCase();
    const subCommand2 = args[1] == undefined ? undefined : args[1].toLowerCase();

    switch (subCommand) {
        case undefined:
        case "config":
            config.openGUI();
            settingOpen = true;
            break;
        case "waypoint":
        case "wp":
        case "coordinate":
        case "coord":
            args.shift();
            switch (subCommand2) {
                case "add":
                case "set":
                    args.shift();
                    args.unshift("waypoint_set_coord");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "remove":
                    args.shift();
                    args.unshift("waypoint_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    ChatLib.command("waypoint_reset", true);
                    break;
                default:
                    ChatLib.chat(`&b&l[LoucoUtils] &fUnknown subcommand in ${subCommand}. Try`);
                    ChatLib.chat(`&b/lu ${subCommand} &f[&badd(&bset) &bx y z &f/ &bremove name &f/ &breset&f]`);
                    break;
            }
            break;
        default:
            ChatLib.chat("&b&l[LoucoUtils] &fUnknown subcommand. Please check your command.");
            commandHelp();
            break;
    }
}).setName("loucoutils").setAliases("lu");