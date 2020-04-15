#story generator
tempo = ['há quanto tempo', 'faz muito tempo', 'naquele tempo', 'naquele momento', 'décadas atrás', 'milenios se passaram', 'hoje', 'ontem']
classes = ['mage', 'hunter', 'assassin', 'knight', 'arrow', 'paladin', 'healer']
pronomes = ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']
from random import choice
for i in range(0, 10):
    print(f'{choice(tempo)} {choice(pronomes)} um {choice(classes)}. ')
