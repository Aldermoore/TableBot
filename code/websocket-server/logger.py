import logging

logging.basicConfig(filename='tablebot2.log', format='%(asctime)s, %(message)s', datefmt='%Y-%m-%d %H:%M:%S', level=logging.CRITICAL)
logging.info('Started logging --- Server starting')

def log(message: str):
    ## logging the data
    logging.critical(message)