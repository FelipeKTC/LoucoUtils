import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, @ParagraphProperty, Color} from  "../Vigilance/index"

@Vigilant('LoucoUtils', '§zLoucoUtils', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Fishing','Utils','Extras','Waypoints']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Config{
    @SwitchProperty({
        name:'Fishing Messages',
        description: 'Different messages for fishing',
        category: 'Fishing',
        subcategory: 'Fishing'
    })
    FishingMsg = false 

    @SwitchProperty({
        name: 'Golem Particles',
        description: 'Toggles particles when Endstone Protector spawns',
        category: 'Utils',
        subcategory: 'End'
    })
    GolemParticles = false
    
    @SelectorProperty({
        name: 'Default Golem Particles',
        description: 'Default particles option for when Golem dies',
        category: 'Utils',
        subcategory: 'End',
        options: ['Off','Low','Medium','High','Extreme'],
    })
    GolemDefaultParticles = 0;

    @SwitchProperty({
        name: 'Auto Return',
        description: 'Attempts to return to skyblock after kick. ',
        category: 'Utils',
        subcategory: 'General'
    })
    AutoComeback = false 

    @SwitchProperty({
        name: 'Kicked Message',
        description: 'Sends message saying you have been kicked. ',
        category: 'Utils',
        subcategory: 'General'
    })
    ComebackMessage = false 

    @SwitchProperty({
        name: 'Falling Blocks and stuff',
        description: 'Disables falling blocks and other things that lags',
        category: 'Utils',
        subcategory: 'General'
    })
    UselessThings = false

    @SwitchProperty({
        name: 'Vanquisher Alert',
        description: 'Sends Coordinates in party when spawning a Vanquisher',
        category: 'Utils',
        subcategory: 'Crimson Isle'
    })
    VanqAlert = false

    @SwitchProperty({
        name: 'Auto Requeue',
        description: 'Auto requeue for dungeons',
        category: 'Utils',
        subcategory: 'Dungeons'
    })
    AutoRequeue = false

    @SwitchProperty({
        name: '(Auto Requeue)^2',
        description: 'Turns on and off auto requeue if dungeon starts/someone needs downtime (dt/downtime).',
        category: 'Utils',
        subcategory: 'Dungeons'
    })
    AutoAutoRequeue = false

    @TextProperty({
        name: 'Auto Requeue Time',
        description: 'Time waited to auto requeue',
        category: 'Utils',
        subcategory: 'Dungeons',
    })
    AutoRequeueTime = "500"
    
    @SwitchProperty({
        name: 'UwU',
        description : 'UwU',
        category: 'Extras',
        subcategory: 'UwU'
    })
    
    UwU = false 
    
    @SwitchProperty({
        name: "Recieve waypoint from chat",
        description: "Toggle to recieve waypoint from chat",
        category: "Waypoint",
        subcategory: "Recieve Waypoint"
    })
    recieveWaypoint = true;

    @SwitchProperty({
        name: "Recieve waypoint from chat include yourself",
        description: "Toggle to recieve waypoint from chat if the coord send by yourself",
        category: "Waypoint",
        subcategory: "Recieve Waypoint"
    })
    recieveOwnWaypoint = true;

    @SliderProperty ({
        name: "Waypoint timer",
        description: "Time for waypoint to disappear, 0 for OFF",
        category: "Waypoint",
        subcategory: "Waypoint Settings",
        min: 0,
        max: 300
    })
    WaypointDelay = 0;


    @SwitchProperty({
        name: "Waypoint Unload When Swapping Lobby",
        description: "The waypoint will be removed when swapping lobbies",
        category: "Waypoint",
        subcategory: "Waypoint Settings"
    })
    waypointUnloadWhenSwapLobby = true;

    @ColorProperty({
        name: "Waypoint Beacon Color",
        description: "Pick a color for beacon",
        category: "Waypoint",
        subcategory: "Waypoint Beacon Color",
    })
    waypointBeaconColor = Color.RED;

    @DecimalSliderProperty({
        name: "Waypoint Text Size",
        description: "The waypoint text size",
        category: "Waypoint",
        subcategory: "Waypoint Settings",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    waypointTextSize = 2.0;

    @SliderProperty({
        name: "Waypoint Distance",
        description:"Distance for waypoint to vanish",
        category:"Waypoint",
        subcategory: "Waypoint Settings",
        min: 1,
        max: 50,
    })
    waypointDistance = 1;

    constructor(){
        this.initialize(this)

        this.addDependency("Waypoint timer","Recieve waypoint from chat");
        this.addDependency("Default Golem Particles","Golem Particles");
        this.addDependency("Waypoint Unload When Swapping Lobby","Recieve waypoint from chat");
        this.addDependency("Recieve waypoint from chat include yourself", "Recieve waypoint from chat");
        this.addDependency("Waypoint Beacon Color", "Recieve waypoint from chat");
        this.addDependency("Waypoint Text Size", "Recieve waypoint from chat");
        this.addDependency("Waypoint Distance", "Recieve waypoint from chat");
    }

}
export default new Config();