const summoner_skill_list = [
      {
          "id":"1",
          "name":"净化",
          "description":"移除身上的所有限制效果（压制效果和击飞效果除外）和召唤师技能的减益效果，并且若在接下来的3秒里再次被施加限制效果时，新效果的持续时间会减少65%。",
          "summonerlevel":"9",
          "cooldown":"210",
          "gamemode":"无限火力,,峡谷大乱斗,克隆大作战,极地大乱斗,经典,训练模式,末日人机,教学,一对一模式,源计划",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_boost.png"
      },
      {
          "id":"3",
          "name":"虚弱",
          "description":"虚弱目标敌方英雄，降低其30%的移动速度，并使其造成的伤害减少40%，持续3秒。",
          "summonerlevel":"4",
          "cooldown":"210",
          "gamemode":",无限火力,训练模式,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_exhaust.png"
      },
      {
        "id":"4",
          "name":"闪现",
          "description":"使英雄朝着你的指针所停的区域瞬间传送一小段距离。",
          "summonerlevel":"7",
          "cooldown":"300",
          "gamemode":",无限火力,训练模式,冰雪无限火力,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗,一对一模式,源计划",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png"
      },
    //   {
    //     "id":"5",
    //       "name":"",
    //       "description":"",
    //       "summonerlevel":"4",
    //       "cooldown":"180",
    //       "gamemode":"",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_Backtrack.png"
    //   },
      {
        "id":"6",
          "name":"幽灵疾步",
          "description":"在10秒里，你的英雄可以无视单位的碰撞体积并且获得24~48%移动速度加成(基于英雄等级)。【幽灵疾步】会在参与击杀后延长其持续时间。",
          "summonerlevel":"1",
          "cooldown":"210",
          "gamemode":",无限火力,训练模式,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗,一对一模式,源计划",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_haste.png"
      },
      {
        "id":"7",
          "name":"治疗术",
          "description":"为你和目标友军英雄回复95-345（取决于英雄等级）生命值，并为你和目标友军英雄提供30%移动速度加成，持续1秒。若目标近期已受到过其它治疗术的影响，则治疗术对目标产生的治疗效果减半。",
          "summonerlevel":"1",
          "cooldown":"240",
          "gamemode":",无限火力,训练模式,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗,源计划",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_heal.png"
      },
      {
        "id":"11",
          "name":"惩戒",
          "description":"对目标史诗级野怪、大型野怪、中型野怪或小兵造成450真实伤害。可持有2层充能(90秒充能时间)",
          "summonerlevel":"9",
          "cooldown":"15",
          "gamemode":"无限火力,经典,峡谷大乱斗,克隆大作战,训练模式,,教学,末日人机",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_smite.png"
      },
      {
        "id":"12",
          "name":"传送",
          "description":"在引导4秒后，将你的英雄传送到友方建筑物旁边。会在14分钟时升级为【解封的传送】，【解封的传送】可将你的英雄传送至友方建筑物、友方小兵或友方守卫旁边。",
          "summonerlevel":"7",
          "cooldown":"360",
          "gamemode":"克隆大作战,训练模式,经典,教学,,峡谷大乱斗,末日人机",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_teleport.png"
      },
      {
        "id":"13",
          "name":"清晰术",
          "description":"为你的英雄回复50%的最大法力值。也会为周围的友军回复25%的最大法力值",
          "summonerlevel":"6",
          "cooldown":"240",
          "gamemode":"极地大乱斗,一对一模式",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/SummonerMana.png"
      },
      {
        "id":"14",
          "name":"引燃",
          "description":"引燃是对单体敌方目标施放的持续性伤害技能，在5秒的持续时间里造成70-410（取决于英雄等级）真实伤害，获得目标的视野，并减少目标所受的治疗和回复效果。",
          "summonerlevel":"9",
          "cooldown":"180",
          "gamemode":",无限火力,训练模式,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗,一对一模式",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/SummonerIgnite.png"
      },
      {
        "id":"21",
          "name":"屏障",
          "description":"为你的英雄套上护盾，吸收115-455（取决于英雄等级）伤害，持续2秒。",
          "summonerlevel":"4",
          "cooldown":"180",
          "gamemode":",无限火力,训练模式,教学,经典,极地大乱斗,末日人机,克隆大作战,峡谷大乱斗,一对一模式,源计划",
          "icon":"https://game.gtimg.cn/images/lol/act/img/spell/SummonerBarrier.png"
      },
    //   {
    //     "id":"30",
    //       "name":"护驾！",
    //       "description":"快速位移到魄罗之王旁边。",
    //       "summonerlevel":"1",
    //       "cooldown":"10",
    //       "gamemode":"魄罗大乱斗",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Benevolence_Of_King_Poro_Icon.png"
    //   },
    //   {
    //     "id":"31",
    //       "name":"魄罗投掷",
    //       "description":"把一个魄罗投向你的敌人。如果它命中了一名敌人，那么你接下来就可以快速位移到被命中的敌人旁边。",
    //       "summonerlevel":"1",
    //       "cooldown":"20",
    //       "gamemode":"魄罗大乱斗",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/summonerskill/SummonerPoroThrow.png"
    //   },
    //   {
    //     "id":"32",
    //       "name":"标记",
    //       "description":"沿直线扔出一个雪球。如果雪球命中了一个敌人，那么这个敌人会被【标记】，提供真实视野，并且你的英雄接下来可以快速突进到被【标记】的目标旁边。",
    //       "summonerlevel":"6",
    //       "cooldown":"80",
    //       "gamemode":"极地大乱斗,一对一模式",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_Mark.png"
    //   },
    //   {
    //     "id":"39",
    //       "name":"标记",
    //       "description":"沿直线扔出一个雪球。如果雪球命中了一个敌人，那么这个敌人会被【标记】，提供真实视野，并且你的英雄接下来可以快速突进到被【标记】的目标旁边。",
    //       "summonerlevel":"6",
    //       "cooldown":"80",
    //       "gamemode":"冰雪无限火力",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_Mark.png"
    //   },
    //   {
    //     "id":"50",
    //       "name":"",
    //       "description":"",
    //       "summonerlevel":"1",
    //       "cooldown":"100",
    //       "gamemode":"奥德赛",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/SummonerTemp2.png"
    //   },
    //   {
    //     "id":"51",
    //       "name":"",
    //       "description":"",
    //       "summonerlevel":"1",
    //       "cooldown":"120",
    //       "gamemode":"",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_haste.png"
    //   },
    //   {
    //     "id":"52",
    //       "name":"",
    //       "description":"",
    //       "summonerlevel":"1",
    //       "cooldown":"0",
    //       "gamemode":"奥德赛",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/SummonerTemp1.png"
    //   },
    //   {
    //     "id":"54",
    //       "name":"占位",
    //       "description":"这个栏位将在游戏开始后，被替换为所选的另一位英雄的终极技能。届时将有30秒的时间选择一个终极技能。请做好准备！",
    //       "summonerlevel":"1",
    //       "cooldown":"0",
    //       "gamemode":"",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_Empty.png"
    //   },
    //   {
    //     "id":"55",
    //       "name":"占位和攻击惩戒",
    //       "description":"这个栏位将在游戏开始后，被替换为所选的另一位英雄的终极技能并且你将获得【攻击惩戒】。届时将有30秒的时间选择一个终极技能。请做好准备！",
    //       "summonerlevel":"1",
    //       "cooldown":"0",
    //       "gamemode":"",
    //       "icon":"https://game.gtimg.cn/images/lol/act/img/spell/Summoner_EmptySmite.png"
    //   }
    ];
export default summoner_skill_list
