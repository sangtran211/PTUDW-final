'''
Chương trình tự động cào dữ liệu từ trang web về máy
Tác giả: Huỳnh Trọng Hùng
Nguồn dữ liệu được lấy từ: https://www.urbanoutfitters.com/ mà chưa có sự cho phép.
Mục đích phục vụ quá trình học tập, cam kết không sử dụng với mục đích nào khác.
'''

*Hướng dẫn sử dụng:*
- Chuẩn bị các đường link dẫn đến sản phẩm trong file links.txt
Link có dạng https://www.urbanoutfitters.com/shop/<ten-san-pham>
Không cần các thành phần phụ phía sau.

- Chạy chương trình:
cd crawler
python crawler.py

- Một file data.csv sẽ được tạo ra chứa các thông tin về sản phẩm.
Các cột có nhiều giá trị như sizes, image_ids, ... thì các giá trị được phân tách bởi |

- Các folder tương ứng với các danh mục sản phẩm sẽ được tạo ra.
Bên trong có các folder con tương ứng với từng sản phẩm.
Bên trong từng folder sản phẩm là hình ảnh của sản phẩm.


