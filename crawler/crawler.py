from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import re
import urllib.request
import os
import csv

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.3'}
IMAGE_LINK = 'https://s7d5.scene7.com/is/image/UrbanOutfitters/'
DATA_FILENAME = 'data.csv'
INPUT_FILENAME = 'links.txt'

def download_image(img_id, category, product_sku):
    r = urllib.request.urlopen(IMAGE_LINK + img_id)
    dir_path = os.path.join(category, product_sku)
    if not os.path.isdir(category):
        os.mkdir(category)
    if not os.path.isdir(dir_path):
        os.mkdir(dir_path)
    with open(os.path.join(dir_path, img_id) + '.jpg', 'wb') as f:
        f.write(r.read())
    
    
def process_wrapper(url):
    req = Request(url=url, headers=HEADERS) 
    html = urlopen(req).read() 
    soup = BeautifulSoup(html, 'lxml')
    
    product_colors = soup.find_all('input', class_='c-pwa-swatch__input c-pwa-custom-radio__input')
    product_colors = [color_id['value'] for color_id in product_colors]
    
    for color_id in product_colors:
        url_child = url + '?color=' + color_id
        print('[INFO] processing', url_child)
        process(url_child)
        
        
def process(url):
    req = Request(url=url, headers=HEADERS) 
    html = urlopen(req).read() 
    soup = BeautifulSoup(html, 'lxml')
    
    product_images = soup.find_all('img', class_='c-pwa-image-viewer-thumbnails__img')
    product_image_ids = []
    for img in product_images:
        img_id = re.search(r'[0-9]{8}_[0-9]{3}_[a-z]{1}', img['src']).group()
        product_image_ids.append(img_id)
    product_category = [cat.contents[0] for cat in soup.find_all('a', class_='o-pwa-breadcrumbs__link')][1]
    product_id = product_image_ids[0][:-2]
    product_sku = product_id[:8]
    product_name = soup.find('h1', class_='c-pwa-product-meta-heading').contents[0]
    product_name = product_name.strip()
    product_price = soup.find('span', class_='c-pwa-product-price__current').contents[0]
    product_price = product_price[1:]
    product_brand = soup.find('a', class_='c-pwa-product-brand-url__link').contents[0]
    product_brand = ' '.join(product_brand.split()[2:])
    product_color = soup.find('span', class_='c-pwa-sku-selection__color-value').contents[0]
    product_color = product_color.strip()
    product_color_id = product_id[-3:]
    product_sizes = soup.find_all('label', class_='c-pwa-radio-boxes__label')
    product_sizes = [size.contents[0].strip() for size in product_sizes if size.contents[0].strip() != 'Regular']
    product_description = soup.find('div', class_='s-pwa-cms c-pwa-markdown').contents[0].text
    product_contents_ = soup.find('div', class_='s-pwa-cms c-pwa-markdown').contents[0].find_next_siblings('p')
    product_contents = []
    for content in product_contents_:
        product_contents.extend([sent.strip() for sent in content if isinstance(sent, str)])
    
    for img_id in product_image_ids:
        download_image(img_id, product_category, product_sku)
        
    product_sizes = '|'.join(product_sizes)
    product_contents = '|'.join(product_contents)
    product_image_ids = '|'.join(product_image_ids)
    
    with open(DATA_FILENAME, 'a', newline='') as fcsv:
        f = csv.writer(fcsv)
        f.writerow([product_id, product_sku, product_name, product_category, product_price, product_brand,
                    product_color, product_color_id, product_image_ids, product_sizes,
                    product_description, product_contents, url])
                    
                    
def main():
    with open(INPUT_FILENAME, 'r') as f:
        urls = [url.strip() for url in f.readlines()]
    with open(DATA_FILENAME, 'w', newline='') as fcsv:
        f = csv.writer(fcsv)
        f.writerow(['id', 'sku', 'name', 'category', 'price', 'brand', 'color', 'color_id', 'image_ids', 'sizes',
                    'description', 'contents', 'url'])
    for url in urls:
        print('[INFO] processing', url)
        process_wrapper(url)
        
        
if __name__ == '__main__':
    main()


