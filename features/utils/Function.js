import Config from "../../config";

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString");

export function isHoldItem(id) {
    return Player.getHeldItem()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id === id;
}

export function getId(item) {
    return item?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id;
}

export function getItemScroll(item) {
    return Player.getHeldItem()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.ability_scroll;
}

export function getCandyUsed(pet) {
    return JSON.parse(pet.getNBT()?.toObject()?.tag?.ExtraAttributes?.petInfo).candyUsed;
}

export function getPetXP(pet) {
    return JSON.parse(pet.getNBT()?.toObject()?.tag?.ExtraAttributes?.petInfo).exp;
}

export function getPetType(pet) {
    return JSON.parse(pet.getNBT()?.toObject()?.tag?.ExtraAttributes?.petInfo).type;
}

export function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + "b";
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "m";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + "k";
    } else {
        return num.toString();
    }
}


export function checkWhitelist(player) {
    const whitelist_mode = Config.whitelist;
    const blacklist_mode = Config.blacklist;
    let lower_case_player_ign = player.toString().toLowerCase();

    if (blacklist_mode) {
        let blacklist_ign = Config.blacklistIGN.split(" ");
        for (let a = 0; a < blacklist_ign.length; a++)
            if (lower_case_player_ign == blacklist_ign[a].toLowerCase()) {
                setTimeout(() => {
                    ChatLib.chat(`&b&l[LoucoUtils] &f[${player}] is on blacklist!`);
                }, 50);

                return false;
            }
    }

    if (whitelist_mode) {
        let whitelist_ign = Config.whitelistIGN.split(" ");
        for (let a = 0; a < whitelist_ign.length; a++)
            if (lower_case_player_ign == whitelist_ign[a].toLowerCase())
                return true;

        setTimeout(() => {
            ChatLib.chat(`&b&l[LoucoUtils] &f[${player}] is not on whitelist!`);
        }, 50);

        return false;
    }

    return true;
}

export function getUniqueNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

export function getUniqueValue(str) {
    const uniqueNumber = getUniqueNumber(str);
    const today = new Date().toISOString().substr(0, 10);
    const hash = getUniqueNumber(today + uniqueNumber);
    const value = Math.abs(hash % 101);
    return value;
}

export function getIGN(player) {
    let player_ign = player;

    player_ign = player_ign.replace(/[^0-9A-Za-z_]+$/, "");

    let match_list = player_ign.match(/[0-9A-Za-z_]+$/);

    if (match_list !== null) {
        player_ign = match_list[0];
    } else {
        player_ign = "";

        setTimeout(() => {
            ChatLib.chat(`error at IGN, input = "${player}"`);
        }, 50);
    }

    return player_ign;
}

export function getColorArray(color) {
    const red = color.getRed();
    const green = color.getGreen();
    const blue = color.getBlue();
    const alpha = color.getAlpha();

    return [red, green, blue, alpha];
}

export function romanToInt(roman) {
    const romanNumerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let letters = roman.split("");
    let result = 0;
    for (var i = 0; i < letters.length; i++) {
        if (romanNumerals[letters[i]] < romanNumerals[letters[i + 1]]) {
            result -= romanNumerals[letters[i]]
        } else {
            result += romanNumerals[letters[i]]
        }
    }
    return result;
}

export function getVec3Pos(vec) {
    return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

export function getVec3iPos(vec) {
    return [parseInt(vec.func_177958_n()), parseInt(vec.func_177956_o()), parseInt(vec.func_177952_p())]
}

// Reference to https://github.com/Soopyboo32/SoopyV2/blob/master/src/utils/utils.js
export function addLore(item, prefix, value) {

    const list = item.
        getNBT().
        getCompoundTag("tag").
        getCompoundTag("display").
        getTagMap().
        get("Lore");

    let done = false;

    for (let i = 0; i < list.func_74745_c(); i++) {
        if (String(list.func_150307_f(i)).startsWith(prefix)) {
            list.func_150304_a(i, new NBTTagString(prefix + value));
            done = true;
        }
    }
    if (!done) {
        list.func_74742_a(new NBTTagString(prefix + value));
    }

    item.
        getNBT().
        getCompoundTag("tag").
        getCompoundTag("display").
        getRawNBT().
        func_74782_a("Lore", list);
}
// This function from OdinClient https://github.com/odtheking/OdinClient/
/**
 * Returns the squared 3D distance between two Minecraft entities.
 * @param {object} mcEntity1 - The first Minecraft entity.
 * @param {object} mcEntity2 - The second Minecraft entity.
 * @returns {number} The squared 3D distance between the two entities.
 */
export function noSqrt3DDistance(mcEntity1, mcEntity2) {
    return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
        Math.pow(mcEntity1.field_70163_u - mcEntity2.field_70163_u, 2) +
        Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
 * Returns the entity render parameters for a given Minecraft entity.
 * @param {object} mcEntity - The Minecraft entity.
 * @param {number} partialTicks - The partial ticks for rendering.
 * @returns {Array} An array with the entity render parameters.
 */
export function getEntityRenderParams(mcEntity, partialTicks) {
    return [
        mcEntity.field_70142_S + (mcEntity.field_70165_t - mcEntity.field_70142_S) * partialTicks,
        mcEntity.field_70137_T + (mcEntity.field_70163_u - mcEntity.field_70137_T) * partialTicks,
        mcEntity.field_70136_U + (mcEntity.field_70161_v - mcEntity.field_70136_U) * partialTicks,
        mcEntity.field_70130_N,
        mcEntity.field_70131_O
    ]
}
