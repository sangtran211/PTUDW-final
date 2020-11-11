from urllib.request import urlopen, Request
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.3'}
URL_PAGE = 'https://www.urbanoutfitters.com/mens-clothing?page='
PAGE_RANGE = 32
LINKS_FILENAME = 'links.txt'


def extract_links(url):
    req = Request(url=url, headers=HEADERS) 
    html = urlopen(req).read() 
    soup = BeautifulSoup(html, 'lxml')
    
    links = soup.find_all('a', class_='c-pwa-product-tile__link c-pwa-product-tile__link c-pwa-link c-pwa-link--client')
    links = [link['href'] for link in links]
    
    head = 'https://www.urbanoutfitters.com'
    urls = []
    for link in links:
        u = head + link.split('?')[0]
        urls.append(u)
        
    return urls


def extract_links_wrapper():
    urls = []
    for i in range(PAGE_RANGE):
        print(f'[INFO] processing url {URL_PAGE + str(i+1)}')
        urls.extend(extract_links(URL_PAGE + str(i+1)))
    
    urls = set(urls)
    
    with open(LINKS_FILENAME, 'w') as f:
        for url in urls:
            f.write(url + '\n')
            

if __name__== '__main__':
    extract_links_wrapper()