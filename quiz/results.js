// results.js — 15 profils (verbatim depuis quiz-content.json)
// NE PAS MODIFIER LES TEXTES.

const PROFILES = {
  'stress-flex': {
    type: 'combinatory',
    appui: 'stress',
    tension_dim: 'flex',
    title: 'Je tiens, mais je résiste au mouvement',
    anchor: "Tu as développé une vraie capacité à tenir sous pression — l'Énervement ne prend pas facilement les commandes, et tu gardes un fil même quand les situations se compliquent. C'est une force réelle, construite souvent à force d'expériences difficiles traversées.",
    tension: {
      title: 'Solidité qui se fragilise quand tout bouge',
      text: "Tenir sous pression ne suffit pas toujours — il faut aussi savoir changer de cap en plein vol. Peut-être qu'il t'arrive, dans ces moments-là, de t'accrocher à une approche qui ne fonctionne plus, parce que la lâcher semblerait perdre le seul appui qui te reste ? Comme si s'adapter au milieu de la tempête demandait une énergie que tu n'as plus, une fois que tu as mobilisé tout ce qu'il faut pour tenir.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'stress-resol': {
    type: 'combinatory',
    appui: 'stress',
    tension_dim: 'resol',
    title: "Je tiens, mais je n'avance pas",
    anchor: "Tu as développé une vraie capacité à tenir sous pression — l'Énervement ne prend pas facilement les commandes, et tu gardes un fil même quand les situations se compliquent. C'est une force réelle, construite souvent à force d'expériences difficiles traversées.",
    tension: {
      title: 'Tenir sans avancer',
      text: "Tenir, c'est déjà beaucoup. Mais il y a peut-être des moments où tu te surprends à endurer une situation sans vraiment trouver le chemin pour la dénouer ? Comme si l'Inquiétude ou l'Évitement occupaient le terrain juste assez pour empêcher le passage à l'action — non pas par manque de courage, mais parce que sous pression, la résolution demande une disponibilité intérieure que le stress a déjà en partie confisquée.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'stress-rel': {
    type: 'combinatory',
    appui: 'stress',
    tension_dim: 'rel',
    title: 'Je tiens, mais je tiens seul(e)',
    anchor: "Tu as développé une vraie capacité à tenir sous pression — l'Énervement ne prend pas facilement les commandes, et tu gardes un fil même quand les situations se compliquent. C'est une force réelle, construite souvent à force d'expériences difficiles traversées.",
    tension: {
      title: 'Robustesse solitaire',
      text: "Mais tenir seul(e) a un coût que l'on ne mesure pas toujours. Peut-être qu'au fil du temps, tu as appris que tu pouvais compter sur toi-même — et un peu moins sur les autres ? Comme si demander du soutien, laisser quelqu'un entrer dans ton espace de pression, risquait de fragiliser l'équilibre que tu as mis tant d'énergie à construire. Et pourtant, les autres ne sont pas forcément une charge supplémentaire — ils peuvent aussi être un soutien que tu ne t'autorises pas encore vraiment.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'flex-stress': {
    type: 'combinatory',
    appui: 'flex',
    tension_dim: 'stress',
    title: "Je m'adapte, mais je me perds dans la tempête",
    anchor: "Tu as une vraie capacité à accueillir le Changement — les situations inconnues ne te figent pas, et tu sais laisser tes convictions évoluer quand une nouvelle perspective le mérite. Cette souplesse est une ressource rare, surtout dans des contextes qui bougent vite.",
    tension: {
      title: 'Agilité sans ancre',
      text: "Mais peut-être que cette capacité à t'adapter a une face cachée : quand la pression monte vraiment, quand le Stress s'installe durablement, tu pourrais avoir du mal à trouver un point fixe auquel t'accrocher ? Comme si ton agilité, qui est une force dans les contextes fluides, te laissait sans ancre dans les moments où ce dont tu as besoin c'est justement de tenir — de ne pas bouger, de résister, de rester là.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'flex-resol': {
    type: 'combinatory',
    appui: 'flex',
    tension_dim: 'resol',
    title: "Je m'adapte, mais je reste en mouvement",
    anchor: "Tu as une vraie capacité à accueillir le Changement — les situations inconnues ne te figent pas, et tu sais laisser tes convictions évoluer quand une nouvelle perspective le mérite. Cette souplesse est une ressource rare, surtout dans des contextes qui bougent vite.",
    tension: {
      title: "L'angle mort du rebond permanent",
      text: "Mais il y a peut-être une frontière ténue entre s'adapter et contourner ? Quand un problème se présente, ton agilité pourrait parfois t'offrir tellement de chemins alternatifs que tu passes à côté du chemin qui mène directement à ce qui mérite d'être vraiment regardé. Comme si la flexibilité devenait une façon naturelle de rester en mouvement — sans forcément s'arrêter là où quelque chose demande à être résolu.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'flex-rel': {
    type: 'combinatory',
    appui: 'flex',
    tension_dim: 'rel',
    title: "Je m'adapte, mais sans m'ancrer dans les autres",
    anchor: "Tu as une vraie capacité à accueillir le Changement — les situations inconnues ne te figent pas, et tu sais laisser tes convictions évoluer quand une nouvelle perspective le mérite. Cette souplesse est une ressource rare, surtout dans des contextes qui bougent vite.",
    tension: {
      title: 'Le rythme qui laisse peu de place',
      text: "Mais peut-être que ce rythme de rebond permanent laisse moins de place aux relations qu'on ne le croit ? Quand une solution succède si naturellement à une autre, il y a peut-être moins d'espace — et moins de temps — pour vraiment investir dans les autres. Non pas par manque d'intérêt, mais parce que l'autonomie devient le réflexe par défaut, là où compter sur quelqu'un aurait pu être une option.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'resol-stress': {
    type: 'combinatory',
    appui: 'resol',
    tension_dim: 'stress',
    title: "J'agis, mais la pression me déborde",
    anchor: "Tu as une vraie capacité à faire face aux obstacles — l'Inquiétude ne monopolise pas la parole, l'Évitement n'est pas ton réflexe par défaut, et tu sais garder tes émotions comme des consultantes plutôt que comme des dirigeantes. C'est une force réelle, qui te permet d'avancer là où d'autres restent bloqués.",
    tension: {
      title: "L'action court-circuitée par la pression",
      text: "Mais peut-être que cette capacité à agir a une condition implicite que tu n'as pas toujours identifiée : elle fonctionne bien quand le contexte reste suffisamment stable pour que tu puisses réfléchir et décider. Quand la pression monte vraiment — quand le Stress s'installe et que l'Énervement commence à occuper le terrain — il se pourrait que tes ressources habituelles de résolution deviennent moins accessibles, comme si la pression court-circuitait le chemin entre ce que tu sais faire et ce que tu arrives à faire dans l'instant.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'resol-flex': {
    type: 'combinatory',
    appui: 'resol',
    tension_dim: 'flex',
    title: "J'agis, mais sur mon terrain de prédilection",
    anchor: "Tu as une vraie capacité à faire face aux obstacles — l'Inquiétude ne monopolise pas la parole, l'Évitement n'est pas ton réflexe par défaut, et tu sais garder tes émotions comme des consultantes plutôt que comme des dirigeantes. C'est une force réelle, qui te permet d'avancer là où d'autres restent bloqués.",
    tension: {
      title: 'La sécurité des solutions connues',
      text: "Mais peut-être que cette capacité à agir amène parfois à appliquer des solutions qui ont déjà fait leurs preuves — même quand le terrain a changé ? Non pas par manque de ressources, mais parce que sous pression, l'approche connue est plus rassurante, plus immédiatement accessible. Et pendant ce temps, une approche différente — pas forcément meilleure, mais peut-être plus simple ou plus adaptée à la situation — attend dans l'angle mort, sans jamais vraiment être considérée.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'resol-rel': {
    type: 'combinatory',
    appui: 'resol',
    tension_dim: 'rel',
    title: "J'agis, mais en solitaire",
    anchor: "Tu as une vraie capacité à faire face aux obstacles — l'Inquiétude ne monopolise pas la parole, l'Évitement n'est pas ton réflexe par défaut, et tu sais garder tes émotions comme des consultantes plutôt que comme des dirigeantes. C'est une force réelle, qui te permet d'avancer là où d'autres restent bloqués.",
    tension: {
      title: "L'autonomie comme réflexe par défaut",
      text: "Mais peut-être que cette capacité à résoudre par toi-même a fini par devenir le chemin par défaut — même dans les situations où les autres auraient pu être une ressource utile ? Comme si impliquer quelqu'un d'autre ajoutait une complexité qui ralentit, alors que tu sais déjà trouver le chemin seul(e). Ce n'est pas forcément un choix conscient — c'est peut-être simplement que l'autonomie dans la résolution est tellement naturelle qu'elle laisse peu d'espace pour envisager que deux regards valent parfois mieux qu'un.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'rel-stress': {
    type: 'combinatory',
    appui: 'rel',
    tension_dim: 'stress',
    title: 'Je connecte, mais la pression change mes priorités',
    anchor: "Tu as une vraie capacité à créer des liens — les autres se sentent à l'aise avec toi, ils te confient facilement leurs histoires, et l'échange est une nourriture réelle pour toi. C'est une ressource précieuse, qui crée autour de toi un tissu relationnel que beaucoup envient.",
    tension: {
      title: 'Le lien comme réflexe de régulation',
      text: "Mais peut-être qu'en situation de pression, le réflexe de chercher ou de préserver le lien prend parfois le dessus sur ce que la situation demande vraiment ? Comme si, quand le Stress monte, la priorité devenait instinctivement de maintenir la connexion avec les autres — rassurer, ne pas décevoir, rester dans le lien — même quand ce n'est pas ce qui résoudrait le problème, ou même quand ça va à l'encontre de la meilleure décision à prendre.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'rel-flex': {
    type: 'combinatory',
    appui: 'rel',
    tension_dim: 'flex',
    title: 'Je connecte, mais je protège le lien du mouvement',
    anchor: "Tu as une vraie capacité à créer des liens — les autres se sentent à l'aise avec toi, ils te confient facilement leurs histoires, et l'échange est une nourriture réelle pour toi. C'est une ressource précieuse, qui crée autour de toi un tissu relationnel que beaucoup envient.",
    tension: {
      title: 'Chaleur relationnelle, repères fixes',
      text: "Mais peut-être que cette chaleur relationnelle coexiste avec une difficulté à bouger quand le contexte change — et que cette tension crée parfois des frictions dans tes relations elles-mêmes ? Comme si les liens que tu tisses reposaient implicitement sur une certaine stabilité — une façon d'être ensemble, des habitudes partagées, des repères communs — et que quand ces repères bougent, tu as du mal à laisser la relation évoluer avec eux.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'rel-resol': {
    type: 'combinatory',
    appui: 'rel',
    tension_dim: 'resol',
    title: "Je connecte, même quand ça n'est pas là que ça se passe",
    anchor: "Tu as une vraie capacité à créer des liens — les autres se sentent à l'aise avec toi, ils te confient facilement leurs histoires, et l'échange est une nourriture réelle pour toi. C'est une ressource précieuse, qui crée autour de toi un tissu relationnel que beaucoup envient.",
    tension: {
      title: "Le lien comme espace de confort",
      text: "Mais peut-être que cette facilité relationnelle devient parfois une façon de rester dans un espace suffisamment confortable pour que les obstacles restent dans l'angle mort un peu plus longtemps que nécessaire ? Comme si la connexion avec les autres — échanger, partager, être ensemble — occupait naturellement la place que la résolution aurait pu prendre. Non pas par manque de lucidité, mais parce que le lien avec les autres est tellement nourrissant.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'balanced-high': {
    type: 'flat',
    appui: null,
    tension_dim: null,
    title: 'Un profil équilibré et solide',
    anchor: "Tes réponses dessinent un profil remarquablement solide sur l'ensemble des dimensions explorées. Chacune semble être une ressource sur laquelle tu peux t'appuyer.",
    tension: {
      title: null,
      text: "Ce quiz n'explore que quatre dimensions de ton intelligence émotionnelle — et il y en a bien d'autres qui pourraient enrichir encore cette lecture.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'balanced-low': {
    type: 'flat',
    appui: null,
    tension_dim: null,
    title: 'Un profil équilibré sous tension',
    anchor: "Tes réponses suggèrent que cette période est peut-être particulièrement coûteuse — comme si plusieurs dimensions étaient sollicitées en même temps, sans vraiment pouvoir s'appuyer l'une sur l'autre.",
    tension: {
      title: null,
      text: "Ce que tu traverses mérite d'être regardé avec bienveillance et sans précipitation.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  },
  'balanced-nuance': {
    type: 'flat',
    appui: null,
    tension_dim: null,
    title: 'Un profil équilibré en nuance',
    anchor: "Tes réponses dessinent un profil nuancé — chaque dimension est présente, mais aucune ne s'impose vraiment comme un point d'appui solide. Peut-être que selon les contextes, selon les jours, tu te sens tantôt à l'aise, tantôt moins ?",
    tension: {
      title: null,
      text: "Ce quiz n'explore que quatre dimensions de ton intelligence émotionnelle — et il y en a bien d'autres qui pourraient aider à mieux identifier où se trouvent tes vraies ressources.\n\nEst-ce que ça résonne avec ce que tu vis ?"
    }
  }
};
