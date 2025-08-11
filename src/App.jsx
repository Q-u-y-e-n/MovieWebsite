import { useState, useEffect } from "react"
import Banner from "./components/Banner.jsx"
import Header from './components/Header.jsx'
import MovieList from "./components/MovieList.jsx"
import MovieSearch from "./components/MovieSearch.jsx"
import { MovieProvider } from "./context/MovieProvider.jsx"

// thư viện carousel
// thư viện youtube react
// thư viện modal react
// biến có dạng falsy : vd: null  ---- và biến có dạng là truthy
//  Tìm hiểu thêm về redux







function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([])
  // setMovie(movie): biến lưu giá trị của movie
  // useState(<giá trị khởi tạo>)

  // mỗi khi dùng hàm để gọi ai ra vào thời điểm ban đầu được chạy thì được bỏ vào fetch
  // nếu không bỏ vào trong effect thì mỗi khi components reRender(khai bào lại) ra thì nó sẽ gọi hàm api rất nhiều lần => dẫn đến web bị châm


  const [movieSearch, setMovieSearch] = useState([])
  const handleSearch = async (searchValue) => {

    setMovieSearch([])
    // khai báo một array rỗng

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const searchMovie = await fetch(url, options)
      const data = await searchMovie.json()
      setMovieSearch(data.results)
    }
    catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options)
      ])


      const data1 = await res1.json()
      const data2 = await res2.json()

      setMovie(data1.results)
      setMovieRate(data2.results)


      // hàm fetch là hàm có sẵn trong js, nó dùng để gọi api 
      // const response = await fetch(url, options)
      // const data = await response.json()

      // setMovie(data.results)
    }
    fetchMovie()
  }, [])





  return (
    <>

      <MovieProvider>
        <div className="bg-black pb-10">
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 ? (<MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} />) : (
            <>
              <MovieList title={"Phim Hot"} data={movie} />
              <MovieList title={"Phim Đề Cử"} data={movieRate} />
            </>
          )}


        </div>

      </MovieProvider>


    </>
  )
}

export default App
// dop: từ cha truyền sang con để con sài cái drop đó
