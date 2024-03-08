import random
from api.utils import Util
def generate_shop_id(length = 10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range (97,123)] + [str(i) for i in range(10)]) for _ in range(length))



