import config from "../../config";
import { getIGN, getColorArray } from "../utils/Function";
import renderBeaconBeam from "../../../BeaconBeam";
import { registerEventListener } from "../utils/EventListener";
import RenderLib from "../../../RenderLib"


let waypoints = [];
const myIGN = getIGN(Player.getName()).toLowerCase();

// Functions from GriffinOwO https://github.com/whats2000/GriffinOWO
function addWaypoint(x, y, z, player) {
    const newWaypoint = {
        x: parseInt(x),
        y: parseInt(y),
        z: parseInt(z),
        name: player
    };
    if(!config.recieveWaypoint){
         return;
    }else{
        waypoints.push(newWaypoint);
        WaypointAfterDelay(player,config.WaypointDelay);
    }
    let show_message = new Message(
        `&3&l[LoucoUtils] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from &3[${player}] &fand added waypoint!! `,
        new TextComponent("&a[Remove Coord] ")
            .setClick("run_command", `/waypoint_remove ${player}`)
            .setHover("show_text", `Click to send /waypoint_remove ${player}`),
        new TextComponent("&c[Remove All Coord]")
            .setClick("run_command", `/waypoint_reset`)
            .setHover("show_text", "Click to send /waypoint_reset"),
    );

    ChatLib.chat(show_message);
}

function WaypointAfterDelay(name,seconds) {
    if (seconds == 0) return;
    setTimeout(() => {
        const removedWaypoints = waypoints.filter(waypoint => waypoint.name === name);
        removedWaypoints.forEach(waypoint => {
            const index = waypoints.indexOf(waypoint);
            waypoints.splice(index, 1);
        });
        ;
    }, seconds*1000);
} 

register("command", () => {
    waypoints = [];
    ChatLib.chat("&3&l[LoucoUtils] &fYou removed all coordinates!!");
}).setName("waypoint_reset");

register("command", (name) => {
    const removedWaypoints = waypoints.filter(waypoint => waypoint.name === name);

    if (removedWaypoints.length > 0) {
        removedWaypoints.forEach(waypoint => {
            const index = waypoints.indexOf(waypoint);
            waypoints.splice(index, 1);
        });

        ChatLib.chat(`&3&l[LoucoUtils] &fRemoved waypoint(s) with name: &3[${name}]`);
    } else {
        ChatLib.chat(`&3&l[LoucoUtils] &fNo waypoint found with name: &3[${name}]`);
    }
}).setName("waypoint_remove");

register("command", (x, y, z, name) => {
    if (!name) name = "Custom_Coord";
    const newWaypoint = {
        x: parseInt(x),
        y: parseInt(y),
        z: parseInt(z),
        name: name
    };
    waypoints.push(newWaypoint);

    let show_message = new Message(
        `&3&l[LoucoUtils] &fYou set a new coordinate at [x: ${x}, y: ${y}, z: ${z}] with the name &3[${name}] `,
        new TextComponent("&a[Remove Coord] ")
            .setClick("run_command", `/waypoint_remove ${name}`)
            .setHover("show_text", "Click to send"),
        new TextComponent("&c[Remove All Coord]")
            .setClick("run_command", `/waypoint_reset`)
            .setHover("show_text", "Click to send"),
    );

    ChatLib.chat(show_message);
}).setName("waypoint_set_coord");

registerEventListener(() => config.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!config.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^Party\s*>\s*\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)
);

registerEventListener(() => config.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!config.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)
);

registerEventListener(() => config.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!config.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^From (.+): ([\d-]+) ([\d-]+) ([\d-]+)/)
);

registerEventListener(() => config.recieveWaypoint,
    register("chat", (player, x, y, z) => {
        player = getIGN(player);

        if (!config.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        const spaceIndex = z.indexOf(' ');
        if (spaceIndex != -1) {
            z = z.substring(0, spaceIndex);
        }

        addWaypoint(x, y, z, player);
    }).setCriteria("${player}: x: ${x}, y: ${y}, z: ${z}")
);

registerEventListener(() => config.recieveWaypoint,
    register("renderWorld", () => {
        if (waypoints.length === 0) return;

        const player_abs_x = Math.abs(Math.round(Player.getX()));
        const player_abs_y = Math.abs(Math.round(Player.getY()));
        const player_abs_z = Math.abs(Math.round(Player.getZ()));

        waypoints.forEach(waypoint => {
            const beacon_abs_x = Math.abs(waypoint.x);
            const beacon_abs_y = Math.abs(waypoint.y);
            const beacon_abs_z = Math.abs(waypoint.z);
            const check_x = Math.abs(player_abs_x - beacon_abs_x);
            const check_y = Math.abs(player_abs_y - beacon_abs_y);
            const check_z = Math.abs(player_abs_z - beacon_abs_z);
            const index = waypoints.indexOf(waypoint);

            const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
            const distance = Math.floor(Math.sqrt(Math.pow(waypoint.x - playerPos[0], 2) + Math.pow(waypoint.y - playerPos[1], 2) + Math.pow(waypoint.z - playerPos[2], 2)));
            if (distance <= config.waypointDistance) {
                waypoints.splice(index, 1);
                ChatLib.chat(`&3&l[LoucoUtils] &fYou arrived at the coordinate &3[${waypoint.name}]&f!!`);
            } else {

                let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z]

                if (distance > 200) {
                    const direction = [
                        waypoint.x - playerPos[0],
                        waypoint.y - playerPos[1],
                        waypoint.z - playerPos[2]
                    ];
                    const scaleFactor = 200 / distance;
                    x = playerPos[0] + direction[0] * scaleFactor;
                    y = playerPos[1] + direction[1] * scaleFactor;
                    z = playerPos[2] + direction[2] * scaleFactor;
                }

                const textColor = 0xFFFFFF;
                const scale = config.waypointTextSize;
                const increase = true;
                Tessellator.drawString(`§a[${index}] ${waypoint.name} [${distance}m]`, x - 0.5, y + 0.5, z - 0.5, textColor, true, scale, increase);

                const maxDistance = 40;
                const beamIntensity = 0.2 + distance / maxDistance;


                const beaconColor = getColorArray(config.waypointBeaconColor);
                RenderLib.drawEspBox((x-0.5), y, (z-0.5), 1, 1, beaconColor[0], beaconColor[1], beaconColor[2], 1, true);
                RenderLib.drawInnerEspBox((x-0.5), y, (z-0.5), 1, 1, beaconColor[0], beaconColor[1], beaconColor[2], 0.25, true);
                renderBeaconBeam((x-1), (y+1), (z-1), beaconColor[0], beaconColor[1], beaconColor[2], beamIntensity, false);
            }
        });
    })
);

registerEventListener(() => config.waypointUnloadWhenSwapLobby,
    register("worldUnload", () => {
            waypoints.forEach(waypoint => {
                    waypoints.splice(waypoints.indexOf(waypoint), 1);
            });
        }
    )
);


