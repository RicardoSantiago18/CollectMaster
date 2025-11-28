// ============================================
// MOCKS DE ITENS POR COLEÇÃO - REMOVER APÓS INTEGRAÇÃO
// ============================================
// Este arquivo contém itens mockados organizados por coleção.
// Para remover: delete este arquivo e remova os imports em collectionService.js

export const mockItemsByCollection = {
  // Hot Wheels Premium (João Silva)
  101: [
    { id: 1001, name: 'Hot Wheels Mustang 67', description: 'Miniatura clássica em escala 1:64, edição limitada', quantity: 1, estimatedValue: 25.0 },
    { id: 1002, name: 'Miniatura Camaro SS', description: 'Modelo colecionável em vermelho metálico', quantity: 1, estimatedValue: 32.0 },
    { id: 1003, name: 'Fusca Colecionável Azul', description: 'Réplica detalhada do clássico brasileiro', quantity: 1, estimatedValue: 18.0 },
    { id: 1004, name: 'Lamborghini Aventador', description: 'Edição especial com acabamento premium', quantity: 1, estimatedValue: 45.0 },
    { id: 1005, name: 'Ferrari F40', description: 'Miniatura em vermelho italiano autêntico', quantity: 1, estimatedValue: 38.0 },
    { id: 1006, name: 'Porsche 911 Turbo', description: 'Modelo detalhado com portas que abrem', quantity: 1, estimatedValue: 28.0 },
    { id: 1007, name: 'McLaren P1', description: 'Edição limitada com certificado', quantity: 1, estimatedValue: 35.0 },
    { id: 1008, name: 'Bugatti Chiron', description: 'Miniatura premium em escala 1:64', quantity: 1, estimatedValue: 24.5 },
  ],

  // Carros Clássicos (João Silva)
  102: [
    { id: 2001, name: 'Chevrolet Impala 1967', description: 'Réplica do clássico americano', quantity: 1, estimatedValue: 42.0 },
    { id: 2002, name: 'Ford Mustang 1965', description: 'Primeira geração do Mustang', quantity: 1, estimatedValue: 40.0 },
    { id: 2003, name: 'Volkswagen Beetle 1960', description: 'Fusca original alemão', quantity: 1, estimatedValue: 35.0 },
    { id: 2004, name: 'Chevrolet Bel Air 1957', description: 'Clássico dos anos 50', quantity: 1, estimatedValue: 38.0 },
    { id: 2005, name: 'Cadillac Eldorado 1959', description: 'Luxo americano dos anos 50', quantity: 1, estimatedValue: 25.0 },
  ],

  // Moedas Brasileiras (Maria Santos)
  201: [
    { id: 3001, name: 'Moeda 1 Real 1994', description: 'Primeira moeda do Real, edição comemorativa', quantity: 1, estimatedValue: 15.0 },
    { id: 3002, name: 'Moeda 50 Centavos 1995', description: 'Moeda histórica do início do Plano Real', quantity: 1, estimatedValue: 12.0 },
    { id: 3003, name: 'Moeda 1 Real 2000', description: 'Moeda comemorativa do milênio', quantity: 1, estimatedValue: 20.0 },
    { id: 3004, name: 'Moeda 5 Reais 1998', description: 'Moeda comemorativa rara', quantity: 1, estimatedValue: 45.0 },
    { id: 3005, name: 'Moeda 1 Real 2010', description: 'Moeda comemorativa da Copa do Mundo', quantity: 1, estimatedValue: 18.0 },
    { id: 3006, name: 'Moeda 1 Real 2016', description: 'Moeda comemorativa das Olimpíadas', quantity: 1, estimatedValue: 22.0 },
    { id: 3007, name: 'Moeda 1 Real 2020', description: 'Moeda comemorativa do Bicentenário', quantity: 1, estimatedValue: 25.0 },
    { id: 3008, name: 'Moeda 50 Centavos 2005', description: 'Moeda em bom estado de conservação', quantity: 1, estimatedValue: 8.0 },
    { id: 3009, name: 'Moeda 1 Real 2014', description: 'Moeda comemorativa da Copa', quantity: 1, estimatedValue: 30.0 },
    { id: 3010, name: 'Moeda 1 Real 2012', description: 'Moeda comemorativa especial', quantity: 1, estimatedValue: 28.0 },
    { id: 3011, name: 'Moeda 1 Real 2008', description: 'Moeda comemorativa do centenário', quantity: 1, estimatedValue: 35.0 },
    { id: 3012, name: 'Moeda 1 Real 2002', description: 'Moeda comemorativa do Real', quantity: 1, estimatedValue: 15.0 },
  ],

  // Moedas Estrangeiras (Maria Santos)
  202: [
    { id: 4001, name: 'Dólar Americano 2000', description: 'Moeda de 1 dólar americano', quantity: 1, estimatedValue: 5.50 },
    { id: 4002, name: 'Euro Alemão 2002', description: 'Primeira moeda de euro alemã', quantity: 1, estimatedValue: 6.0 },
    { id: 4003, name: 'Libra Esterlina 1995', description: 'Moeda britânica histórica', quantity: 1, estimatedValue: 8.0 },
    { id: 4004, name: 'Yen Japonês 1985', description: 'Moeda japonesa antiga', quantity: 1, estimatedValue: 4.0 },
    { id: 4005, name: 'Franco Suíço 1990', description: 'Moeda suíça em bom estado', quantity: 1, estimatedValue: 7.0 },
    { id: 4006, name: 'Dólar Canadense 2005', description: 'Moeda canadense comemorativa', quantity: 1, estimatedValue: 5.0 },
    { id: 4007, name: 'Peso Argentino 1998', description: 'Moeda argentina histórica', quantity: 1, estimatedValue: 3.0 },
    { id: 4008, name: 'Real Espanhol 1990', description: 'Moeda espanhola antiga', quantity: 1, estimatedValue: 2.5 },
    { id: 4009, name: 'Rublo Russo 2000', description: 'Moeda russa pós-soviética', quantity: 1, estimatedValue: 3.5 },
    { id: 4010, name: 'Yuan Chinês 2010', description: 'Moeda chinesa moderna', quantity: 1, estimatedValue: 4.5 },
    { id: 4011, name: 'Rupia Indiana 2005', description: 'Moeda indiana comemorativa', quantity: 1, estimatedValue: 3.0 },
    { id: 4012, name: 'Rand Sul-Africano 1995', description: 'Moeda sul-africana histórica', quantity: 1, estimatedValue: 4.0 },
    { id: 4013, name: 'Peso Mexicano 2000', description: 'Moeda mexicana comemorativa', quantity: 1, estimatedValue: 3.5 },
    { id: 4014, name: 'Dólar Australiano 2010', description: 'Moeda australiana moderna', quantity: 1, estimatedValue: 5.0 },
    { id: 4015, name: 'Coroa Norueguesa 2005', description: 'Moeda norueguesa comemorativa', quantity: 1, estimatedValue: 6.5 },
  ],

  // Selos Brasileiros (Pedro Oliveira)
  301: [
    { id: 5001, name: 'Selo Correios 1980', description: 'Selo comemorativo dos correios', quantity: 1, estimatedValue: 8.0 },
    { id: 5002, name: 'Selo Copa 1994', description: 'Selo comemorativo da Copa do Mundo', quantity: 1, estimatedValue: 12.0 },
    { id: 5003, name: 'Selo Olimpíadas 2016', description: 'Selo comemorativo das Olimpíadas', quantity: 1, estimatedValue: 15.0 },
    { id: 5004, name: 'Selo Bicentenário 2022', description: 'Selo comemorativo do bicentenário', quantity: 1, estimatedValue: 10.0 },
    { id: 5005, name: 'Selo Flora Brasileira', description: 'Série de selos sobre flora', quantity: 1, estimatedValue: 6.0 },
    { id: 5006, name: 'Selo Fauna Brasileira', description: 'Série de selos sobre fauna', quantity: 1, estimatedValue: 6.0 },
    { id: 5007, name: 'Selo Personalidades', description: 'Série de personalidades históricas', quantity: 1, estimatedValue: 8.0 },
    { id: 5008, name: 'Selo Cidades Históricas', description: 'Série de cidades históricas', quantity: 1, estimatedValue: 7.0 },
    { id: 5009, name: 'Selo Arte Brasileira', description: 'Série de arte brasileira', quantity: 1, estimatedValue: 9.0 },
    { id: 5010, name: 'Selo Esportes', description: 'Série de esportes nacionais', quantity: 1, estimatedValue: 5.0 },
    { id: 5011, name: 'Selo Literatura', description: 'Série de escritores brasileiros', quantity: 1, estimatedValue: 8.0 },
    { id: 5012, name: 'Selo Música', description: 'Série de músicos brasileiros', quantity: 1, estimatedValue: 7.0 },
    { id: 5013, name: 'Selo Cinema', description: 'Série de cinema brasileiro', quantity: 1, estimatedValue: 6.0 },
    { id: 5014, name: 'Selo Tecnologia', description: 'Série de tecnologia brasileira', quantity: 1, estimatedValue: 5.0 },
    { id: 5015, name: 'Selo Meio Ambiente', description: 'Série sobre meio ambiente', quantity: 1, estimatedValue: 6.0 },
    { id: 5016, name: 'Selo Turismo', description: 'Série de pontos turísticos', quantity: 1, estimatedValue: 5.0 },
    { id: 5017, name: 'Selo Educação', description: 'Série sobre educação', quantity: 1, estimatedValue: 4.0 },
    { id: 5018, name: 'Selo Cultura Popular', description: 'Série de cultura popular', quantity: 1, estimatedValue: 5.0 },
    { id: 5019, name: 'Selo Festivais', description: 'Série de festivais brasileiros', quantity: 1, estimatedValue: 4.0 },
    { id: 5020, name: 'Selo Tradições', description: 'Série de tradições brasileiras', quantity: 1, estimatedValue: 5.0 },
    { id: 5021, name: 'Selo História', description: 'Série de eventos históricos', quantity: 1, estimatedValue: 7.0 },
    { id: 5022, name: 'Selo Geografia', description: 'Série de geografia brasileira', quantity: 1, estimatedValue: 5.0 },
    { id: 5023, name: 'Selo Ciência', description: 'Série de cientistas brasileiros', quantity: 1, estimatedValue: 6.0 },
    { id: 5024, name: 'Selo Inovação', description: 'Série de inovações brasileiras', quantity: 1, estimatedValue: 5.0 },
    { id: 5025, name: 'Selo Futuro', description: 'Série sobre o futuro do Brasil', quantity: 1, estimatedValue: 4.0 },
  ],

  // Selos Temáticos (Pedro Oliveira)
  302: [
    { id: 6001, name: 'Selo Animais Selvagens', description: 'Série de animais selvagens brasileiros', quantity: 1, estimatedValue: 8.0 },
    { id: 6002, name: 'Selo Animais Marinhos', description: 'Série de animais marinhos', quantity: 1, estimatedValue: 7.0 },
    { id: 6003, name: 'Selo Futebol', description: 'Série de futebol brasileiro', quantity: 1, estimatedValue: 12.0 },
    { id: 6004, name: 'Selo Vôlei', description: 'Série de vôlei brasileiro', quantity: 1, estimatedValue: 10.0 },
    { id: 6005, name: 'Selo Arte Moderna', description: 'Série de arte moderna brasileira', quantity: 1, estimatedValue: 9.0 },
    { id: 6006, name: 'Selo Arte Contemporânea', description: 'Série de arte contemporânea', quantity: 1, estimatedValue: 8.0 },
    { id: 6007, name: 'Selo Arquitetura', description: 'Série de arquitetura brasileira', quantity: 1, estimatedValue: 7.0 },
    { id: 6008, name: 'Selo Escultura', description: 'Série de esculturas brasileiras', quantity: 1, estimatedValue: 6.0 },
    { id: 6009, name: 'Selo Pintura', description: 'Série de pinturas brasileiras', quantity: 1, estimatedValue: 8.0 },
    { id: 6010, name: 'Selo Fotografia', description: 'Série de fotografias brasileiras', quantity: 1, estimatedValue: 7.0 },
    { id: 6011, name: 'Selo Dança', description: 'Série de dança brasileira', quantity: 1, estimatedValue: 6.0 },
    { id: 6012, name: 'Selo Teatro', description: 'Série de teatro brasileiro', quantity: 1, estimatedValue: 7.0 },
    { id: 6013, name: 'Selo Ópera', description: 'Série de ópera brasileira', quantity: 1, estimatedValue: 8.0 },
    { id: 6014, name: 'Selo Música Popular', description: 'Série de música popular brasileira', quantity: 1, estimatedValue: 9.0 },
    { id: 6015, name: 'Selo Música Clássica', description: 'Série de música clássica brasileira', quantity: 1, estimatedValue: 8.0 },
    { id: 6016, name: 'Selo Folclore', description: 'Série de folclore brasileiro', quantity: 1, estimatedValue: 7.0 },
    { id: 6017, name: 'Selo Mitologia', description: 'Série de mitologia brasileira', quantity: 1, estimatedValue: 6.0 },
    { id: 6018, name: 'Selo Lendas', description: 'Série de lendas brasileiras', quantity: 1, estimatedValue: 5.0 },
  ],

  // Livros Raros (Ana Costa)
  401: [
    { id: 7001, name: 'Dom Casmurro - 1ª Edição', description: 'Primeira edição de Machado de Assis', quantity: 1, estimatedValue: 250.0 },
    { id: 7002, name: 'O Guarani - Edição Antiga', description: 'Edição antiga de José de Alencar', quantity: 1, estimatedValue: 180.0 },
    { id: 7003, name: 'Grande Sertão: Veredas', description: 'Primeira edição de Guimarães Rosa', quantity: 1, estimatedValue: 200.0 },
    { id: 7004, name: 'Macunaíma - 1ª Edição', description: 'Primeira edição de Mário de Andrade', quantity: 1, estimatedValue: 150.0 },
    { id: 7005, name: 'Capitães da Areia', description: 'Edição rara de Jorge Amado', quantity: 1, estimatedValue: 120.0 },
    { id: 7006, name: 'Vidas Secas - 1ª Edição', description: 'Primeira edição de Graciliano Ramos', quantity: 1, estimatedValue: 140.0 },
    { id: 7007, name: 'O Cortiço - Edição Antiga', description: 'Edição antiga de Aluísio Azevedo', quantity: 1, estimatedValue: 130.0 },
    { id: 7008, name: 'Memórias Póstumas - 1ª Edição', description: 'Primeira edição de Machado de Assis', quantity: 1, estimatedValue: 220.0 },
    { id: 7009, name: 'Iracema - Edição Histórica', description: 'Edição histórica de José de Alencar', quantity: 1, estimatedValue: 160.0 },
    { id: 7010, name: 'O Tempo e o Vento', description: 'Edição completa de Érico Veríssimo', quantity: 1, estimatedValue: 180.0 },
  ],

  // Quadrinhos (Ana Costa)
  402: [
    { id: 8001, name: 'Turma da Mônica #1', description: 'Primeira edição da Turma da Mônica', quantity: 1, estimatedValue: 45.0 },
    { id: 8002, name: 'Batman: Ano Um', description: 'Graphic novel clássica', quantity: 1, estimatedValue: 35.0 },
    { id: 8003, name: 'Watchmen', description: 'Edição completa de Watchmen', quantity: 1, estimatedValue: 40.0 },
    { id: 8004, name: 'V de Vingança', description: 'Graphic novel completa', quantity: 1, estimatedValue: 30.0 },
    { id: 8005, name: 'Sandman Vol. 1', description: 'Primeiro volume de Sandman', quantity: 1, estimatedValue: 28.0 },
    { id: 8006, name: 'Maus', description: 'Graphic novel premiada', quantity: 1, estimatedValue: 32.0 },
    { id: 8007, name: 'Persépolis', description: 'Graphic novel autobiográfica', quantity: 1, estimatedValue: 25.0 },
    { id: 8008, name: 'Saga Vol. 1', description: 'Primeiro volume de Saga', quantity: 1, estimatedValue: 22.0 },
    { id: 8009, name: 'The Walking Dead #1', description: 'Primeira edição', quantity: 1, estimatedValue: 50.0 },
    { id: 8010, name: 'Y: O Último Homem', description: 'Edição completa', quantity: 1, estimatedValue: 38.0 },
    { id: 8011, name: 'Fables Vol. 1', description: 'Primeiro volume de Fables', quantity: 1, estimatedValue: 20.0 },
    { id: 8012, name: 'Hellboy Vol. 1', description: 'Primeiro volume de Hellboy', quantity: 1, estimatedValue: 24.0 },
    { id: 8013, name: 'Bone', description: 'Graphic novel completa', quantity: 1, estimatedValue: 26.0 },
    { id: 8014, name: 'Preacher Vol. 1', description: 'Primeiro volume de Preacher', quantity: 1, estimatedValue: 28.0 },
    { id: 8015, name: 'Transmetropolitan', description: 'Edição completa', quantity: 1, estimatedValue: 30.0 },
    { id: 8016, name: 'The Boys Vol. 1', description: 'Primeiro volume', quantity: 1, estimatedValue: 32.0 },
    { id: 8017, name: 'Invincible Vol. 1', description: 'Primeiro volume', quantity: 1, estimatedValue: 25.0 },
    { id: 8018, name: 'Locke & Key', description: 'Edição completa', quantity: 1, estimatedValue: 35.0 },
    { id: 8019, name: 'Chew Vol. 1', description: 'Primeiro volume', quantity: 1, estimatedValue: 22.0 },
    { id: 8020, name: 'East of West', description: 'Edição completa', quantity: 1, estimatedValue: 28.0 },
    { id: 8021, name: 'Paper Girls', description: 'Edição completa', quantity: 1, estimatedValue: 26.0 },
    { id: 8022, name: 'Monstress', description: 'Primeiro volume', quantity: 1, estimatedValue: 24.0 },
    { id: 8023, name: 'Descender', description: 'Edição completa', quantity: 1, estimatedValue: 27.0 },
    { id: 8024, name: 'Black Hammer', description: 'Primeiro volume', quantity: 1, estimatedValue: 23.0 },
    { id: 8025, name: 'Gideon Falls', description: 'Edição completa', quantity: 1, estimatedValue: 29.0 },
    { id: 8026, name: 'Die', description: 'Primeiro volume', quantity: 1, estimatedValue: 25.0 },
    { id: 8027, name: 'The Wicked + The Divine', description: 'Edição completa', quantity: 1, estimatedValue: 30.0 },
    { id: 8028, name: 'Sex Criminals', description: 'Primeiro volume', quantity: 1, estimatedValue: 28.0 },
    { id: 8029, name: 'Saga of the Swamp Thing', description: 'Edição completa', quantity: 1, estimatedValue: 32.0 },
    { id: 8030, name: 'Doom Patrol', description: 'Edição completa', quantity: 1, estimatedValue: 35.0 },
  ],

  // Action Figures Marvel (Carlos Ferreira)
  501: [
    { id: 9001, name: 'Spider-Man Classic', description: 'Action figure do Homem-Aranha clássico', quantity: 1, estimatedValue: 85.0 },
    { id: 9002, name: 'Iron Man Mark 50', description: 'Figura do Homem de Ferro', quantity: 1, estimatedValue: 120.0 },
    { id: 9003, name: 'Captain America', description: 'Action figure do Capitão América', quantity: 1, estimatedValue: 95.0 },
    { id: 9004, name: 'Thor Ragnarok', description: 'Figura do Thor', quantity: 1, estimatedValue: 110.0 },
    { id: 9005, name: 'Hulk Classic', description: 'Action figure do Hulk', quantity: 1, estimatedValue: 100.0 },
    { id: 9006, name: 'Black Widow', description: 'Figura da Viúva Negra', quantity: 1, estimatedValue: 90.0 },
    { id: 9007, name: 'Doctor Strange', description: 'Action figure do Doutor Estranho', quantity: 1, estimatedValue: 88.0 },
    { id: 9008, name: 'Black Panther', description: 'Figura do Pantera Negra', quantity: 1, estimatedValue: 105.0 },
    { id: 9009, name: 'Ant-Man', description: 'Action figure do Homem-Formiga', quantity: 1, estimatedValue: 75.0 },
    { id: 9010, name: 'Wasp', description: 'Figura da Vespa', quantity: 1, estimatedValue: 80.0 },
    { id: 9011, name: 'Captain Marvel', description: 'Action figure da Capitã Marvel', quantity: 1, estimatedValue: 95.0 },
    { id: 9012, name: 'Scarlet Witch', description: 'Figura da Feiticeira Escarlate', quantity: 1, estimatedValue: 85.0 },
    { id: 9013, name: 'Vision', description: 'Action figure do Visão', quantity: 1, estimatedValue: 90.0 },
    { id: 9014, name: 'Falcon', description: 'Figura do Falcão', quantity: 1, estimatedValue: 70.0 },
    { id: 9015, name: 'Winter Soldier', description: 'Action figure do Soldado Invernal', quantity: 1, estimatedValue: 88.0 },
  ],

  // Action Figures DC (Carlos Ferreira)
  502: [
    { id: 10001, name: 'Batman Classic', description: 'Action figure do Batman clássico', quantity: 1, estimatedValue: 100.0 },
    { id: 10002, name: 'Superman', description: 'Figura do Superman', quantity: 1, estimatedValue: 95.0 },
    { id: 10003, name: 'Wonder Woman', description: 'Action figure da Mulher-Maravilha', quantity: 1, estimatedValue: 90.0 },
    { id: 10004, name: 'The Flash', description: 'Figura do Flash', quantity: 1, estimatedValue: 85.0 },
    { id: 10005, name: 'Green Lantern', description: 'Action figure do Lanterna Verde', quantity: 1, estimatedValue: 88.0 },
    { id: 10006, name: 'Aquaman', description: 'Figura do Aquaman', quantity: 1, estimatedValue: 82.0 },
    { id: 10007, name: 'Cyborg', description: 'Action figure do Ciborgue', quantity: 1, estimatedValue: 80.0 },
    { id: 10008, name: 'Green Arrow', description: 'Figura do Arqueiro Verde', quantity: 1, estimatedValue: 75.0 },
    { id: 10009, name: 'Black Canary', description: 'Action figure da Canário Negro', quantity: 1, estimatedValue: 78.0 },
    { id: 10010, name: 'Harley Quinn', description: 'Figura da Arlequina', quantity: 1, estimatedValue: 85.0 },
    { id: 10011, name: 'Joker', description: 'Action figure do Coringa', quantity: 1, estimatedValue: 95.0 },
    { id: 10012, name: 'Deathstroke', description: 'Figura do Exterminador', quantity: 1, estimatedValue: 88.0 },
  ],

  // Vinil Clássico (Julia Almeida)
  601: [
    { id: 11001, name: 'Miles Davis - Kind of Blue', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 35.0 },
    { id: 11002, name: 'John Coltrane - A Love Supreme', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 32.0 },
    { id: 11003, name: 'Billie Holiday - Lady in Satin', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 28.0 },
    { id: 11004, name: 'Ella Fitzgerald - Ella and Louis', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 30.0 },
    { id: 11005, name: 'Thelonious Monk - Monk\'s Dream', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 25.0 },
    { id: 11006, name: 'Duke Ellington - Ellington at Newport', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 28.0 },
    { id: 11007, name: 'Charlie Parker - Bird and Diz', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 26.0 },
    { id: 11008, name: 'Dave Brubeck - Time Out', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 30.0 },
    { id: 11009, name: 'Art Blakey - Moanin\'', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 27.0 },
    { id: 11010, name: 'Cannonball Adderley - Somethin\' Else', description: 'Álbum clássico de jazz', quantity: 1, estimatedValue: 29.0 },
    { id: 11011, name: 'Herbie Hancock - Head Hunters', description: 'Álbum clássico de jazz fusion', quantity: 1, estimatedValue: 28.0 },
    { id: 11012, name: 'Weather Report - Heavy Weather', description: 'Álbum clássico de jazz fusion', quantity: 1, estimatedValue: 26.0 },
    { id: 11013, name: 'Chick Corea - Return to Forever', description: 'Álbum clássico de jazz fusion', quantity: 1, estimatedValue: 24.0 },
    { id: 11014, name: 'Pat Metheny - Bright Size Life', description: 'Álbum clássico de jazz fusion', quantity: 1, estimatedValue: 25.0 },
    { id: 11015, name: 'Stan Getz - Getz/Gilberto', description: 'Álbum clássico de bossa nova', quantity: 1, estimatedValue: 32.0 },
    { id: 11016, name: 'Antonio Carlos Jobim - Wave', description: 'Álbum clássico de bossa nova', quantity: 1, estimatedValue: 28.0 },
    { id: 11017, name: 'João Gilberto - Chega de Saudade', description: 'Álbum clássico de bossa nova', quantity: 1, estimatedValue: 30.0 },
    { id: 11018, name: 'Astrud Gilberto - The Astrud Gilberto Album', description: 'Álbum clássico de bossa nova', quantity: 1, estimatedValue: 27.0 },
    { id: 11019, name: 'Sergio Mendes - Brasil \'66', description: 'Álbum clássico de bossa nova', quantity: 1, estimatedValue: 25.0 },
    { id: 11020, name: 'Vinicius de Moraes - Vinicius', description: 'Álbum clássico de MPB', quantity: 1, estimatedValue: 22.0 },
  ],

  // Rock Nacional (Julia Almeida)
  602: [
    { id: 12001, name: 'Legião Urbana - Dois', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 45.0 },
    { id: 12002, name: 'Legião Urbana - Que País É Este', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 42.0 },
    { id: 12003, name: 'Paralamas do Sucesso - Selvagem?', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 38.0 },
    { id: 12004, name: 'Titãs - Cabeça Dinossauro', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 40.0 },
    { id: 12005, name: 'Os Mutantes - Os Mutantes', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 50.0 },
    { id: 12006, name: 'Secos & Molhados - Secos & Molhados', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 48.0 },
    { id: 12007, name: 'Raul Seixas - Krig-ha, Bandolo!', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 55.0 },
    { id: 12008, name: 'Rita Lee - Fruto Proibido', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 45.0 },
    { id: 12009, name: 'Engenheiros do Hawaii - Longe Demais das Capitais', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 40.0 },
    { id: 12010, name: 'Capital Inicial - Independência', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 35.0 },
    { id: 12011, name: 'Barão Vermelho - Maior Abandonado', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 38.0 },
    { id: 12012, name: 'Plebe Rude - Nunca Fomos Tão Jovens', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 42.0 },
    { id: 12013, name: 'Ultraje a Rigor - Nós Vamos Invadir sua Praia', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 40.0 },
    { id: 12014, name: 'Blitz - Blitz', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 35.0 },
    { id: 12015, name: 'Kid Abelha - Seu Espião', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 32.0 },
    { id: 12016, name: 'Skank - Calango', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 30.0 },
    { id: 12017, name: 'O Rappa - O Rappa', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 38.0 },
    { id: 12018, name: 'Cássia Eller - Cássia Eller', description: 'Álbum clássico do rock nacional', quantity: 1, estimatedValue: 40.0 },
  ],
};

// Função para obter itens mockados de uma coleção
export const getMockItemsByCollectionId = (collectionId) => {
  const collectionIdNum = parseInt(collectionId) || collectionId;
  return mockItemsByCollection[collectionIdNum] || [];
};

