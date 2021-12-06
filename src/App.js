import Instruction from './Instruction';
import Stats from "./Stats";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import './app.css';

const App = () => {
  const [parsedList, setParsedList] = useState([]);

  // const navigateTo = (route) => {
  //   const navigate = useNavigate();
  //   navigate(route);
  // }

  const handleFileUpload = async (e) => {
    await parseFile(e.target.files[0]);
    // navigateTo('/stats');
  }

  const parseFile = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (e) => {
      try {
        const result = await generateStats(JSON.parse(e.target.result));
        setParsedList(result);
      } catch (err) {
        console.error(err);
      }
    };
  };

  const generateStats = (arr) => {
    const musicArr = arr.filter((item) => {
      return (item.header === 'YouTube Music') && songIsListenedThisYear(item);
    });
    return new Promise((resolve, reject) => {
      resolve(sortByFrequency(musicArr, 'title'));
      reject(new Error('Something went wrong'));
    });
  };

  const songIsListenedThisYear = (song) => {
    return new Date(song.time).getFullYear() - (new Date().getFullYear() - 1) >= 0;
  };

  const sortByFrequency = (array, sortType) => {
    const frequency = {};
    let parsedList = array.map((item) => {
        const title = item['title'].replace('Watched ', '');
        const artist = item['subtitles'] && item['subtitles'][0]['name'].replace(' - Topic', '');
        return { title, artist };
    });
    parsedList.forEach((value) => {
      frequency[value[sortType]] = 0;
    });
    const uniques = parsedList.filter((value) => {
      return ++frequency[value[sortType]] === 1;
    });
    return uniques.sort((a, b) => {
      return frequency[b[sortType]] - frequency[a[sortType]];
    });
  }

  return (
    <div className="app" style={styles}>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Instruction />
              <label className='custom-file-input'>
                Click to upload your JSON
                <input type="file" onChange={handleFileUpload}/>
              </label>
              <Stats list={parsedList}/>
            </>
          }
        />
        {/*<Route path='stats' element={<Stats list={parsedList}/>}/>*/}
      </Routes>
    </div>
  );
}

export default App;

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
