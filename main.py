import os
import re
from time import sleep
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
from matplotlib.pyplot import title
from requests import Session
from urllib3 import disable_warnings, exceptions
from json import dumps


class League:
    def __init__(self):
        res = os.popen("wmic process  where  name='LeagueClientUx.exe'  get CommandLine").read()
        port = re.findall("--app-port=([0-9]*)",res)[0]
        self.__password = re.findall("--remoting-auth-token=([\\w-]*)",res)[0]
        protocol = 'https'
        self.base_url = f'{protocol}://127.0.0.1:{port}'
        self.__session = Session()
        self.__session.auth = ('riot', self.__password)
        self.__session.verify = False
        disable_warnings(exceptions.InsecureRequestWarning)
        self.summoner = self.request('get', '/lol-summoner/v1/current-summoner').json()
        self.champions = {}
        for x in self.owned_champions():
            self.champions[x['id']] = {'id':x['id'],'alias':x['alias'], 'name':x['name'],'title':x['title']}

    def request(self, method, endpoint, data=None):
        return self.__session.request(method, urljoin(self.base_url, endpoint), data=dumps(data))

    def select_champion(self, champion_id: int, qid: int):
        data = {"championId": champion_id, 'completed': True}
        # print(data)
        print(self.request('patch', f'/lol-champ-select/v1/session/actions/{qid}', data).json())
    def is_me(self, qid: int):
        return self.request('get', f'/lol-champ-select/v1/summoners/{qid}').json().get('isSelf')
    def owned_champions(self):
        return self.request('get', f'/lol-champions/v1/owned-champions-minimal').json()

    def print_champions(self):
        for x in self.champions:
            print('%d:%s-%s-%s'%(self.champions[x]['id'],self.champions[x]['name'],self.champions[x]['title'],self.champions[x]['alias']))
    def game_flow(self):
        # None
        # Lobby
        # Matchmaking
        # ReadyCheck
        # ChampSelect
        # InProgress
        # PreEndOfGame
        # EndOfGame
        return self.request('get', f'/lol-gameflow/v1/gameflow-phase').json()
    def select(self, champion_id: int):
        res = self.request('get', f'/lol-champ-select/v1/session').json()
        self.select_champion(champion_id,res.localPlayerCellId)



if __name__ == '__main__':
    client = League()
    client.print_champions()
    
    # client.select(11)
    # exit()
    champion_id = input("请输入英雄id：")
    print ("你选择的是: ", client.champions[int(champion_id)]['name'], client.champions[int(champion_id)]['title'])
    

    
    t = 2 
    is_select = False
    last_game_flow = ''
    while True :
        if t > 0 :
            sleep(t) 
        game_flow = client.game_flow()
        if game_flow !=last_game_flow:
            print(game_flow) 
        if last_game_flow !='ChampSelect'  and game_flow == 'ChampSelect' :
            client.select(champion_id)
        last_game_flow = game_flow
