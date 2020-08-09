import os
import re
import urllib
from pathlib import Path

base = Path("..") / "content" / "noty"
imgre = re.compile('\\<img[^>]*srcset=["\']([^"\']*)', re.IGNORECASE)
imgcanaryre = re.compile('\\<img', re.IGNORECASE)

def __main__():
    global srcsets
    for root, dirs, files in os.walk(base):
        markdowns = [ f for f in files if f.endswith(".md")]
        for m in markdowns:
            with open(Path(root) / m, 'r') as file:
                content = file.read()
                imgs = extract_img(content)
                for img in imgs:
                    url = img[0]
                    parsed = urllib.parse.urlparse(url)
                    quoted = urllib.parse.urlunparse(parsed._replace(
                        path=urllib.parse.quote(parsed.path)
                    ))
                    filename = Path(parsed.path).parts[-1]
                    root_path = Path(root)
                    target_path = root_path / filename
                    print(img[0])
                    with urllib.request.urlopen(quoted) as source, open(target_path, 'wb') as target:
                        print("downloading {0} from {1}".format(target_path, img[0]))
                        target.write(source.read())


def extract_img(text):
    setsfound = imgre.findall(text)
    imgsfound = imgcanaryre.findall(text)

    if not len(setsfound) == len(imgsfound):
        raise Exception("trzeba obejrzeć okiem ludzkim, coś się nie zgadza (chyba jest img bez srcset)")

    return [extract_widest_url(s) for s in setsfound]

def width(pair):
    return int(pair[1].replace("w",""))

def extract_widest_url(srcset):
    pairs = [ pair.strip().split(" ") for pair in srcset.split(",") ]
    pairs.sort(key=width, reverse=True)
    first = pairs[0]
    second = pairs[1] if len(pairs) > 1 else first

    choice = first
    if width(choice) > 850 and width(second) > 700:
        choice = second
        choice.append("zmienione z {0}".format(width(first)))

    return choice

__main__()

