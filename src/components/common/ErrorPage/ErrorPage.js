import { Link } from 'react-router-dom'
import style from './ErrorPage.module.scss'
const ErrorPage = () => {
  return (
    <>
      <div className={style.error}>
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/yN/r/MnQWcWb6SrY.svg"
          height={112}
          width={112}
          alt="error"
        />
        <h1>Trang này không hiển thị</h1>
        <p>
          Có thể liên kết đã hỏng hoặc trang đã bị gỡ. Hãy kiểm tra xem liên kết
          mà bạn đang cố mở có chính xác không.
        </p>
        <Link to={'/'}>
          <button>Đi tới Trang chủ</button>
        </Link>
      </div>
    </>
  )
}
export default ErrorPage
