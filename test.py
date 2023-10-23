import base64
import gzip
from operator import xor
import zlib

def decrypt_data(savedata: str) -> str:
    decrypted_data = bytes(i ^ 11 for i in savedata)
    decoded_data = base64.b64decode(decrypted_data, altchars='-_')
    decompressed_data = zlib.decompress(decoded_data[10:], -zlib.MAX_WBITS)
    decompressed_data = decompressed_data.replace(b'><', b'> <', 50)
    return decompressed_data


file = open('test', 'rb')
savedata = file.read()
str = decrypt_data(savedata)
print(str)
#print(str.decode('utf-8')   )

