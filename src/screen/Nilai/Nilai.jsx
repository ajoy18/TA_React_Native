import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import BottomNav from '../component/BottomNavigation';
import {useSelector} from 'react-redux';
import ItemNilai from './item';
import url from '../../GlobalUrl';

function Nilai() {
  const [data, setData] = useState([]);
  const {dataUser} = useSelector(state => state.globalVar);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `${url}siswa/get_data_siswa_detail.php?id_siswa=${dataUser.id_user}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + dataUser.token,
            },
          },
        )
        .then(res => {
          // console.log(res.data);
          setData(res.data.data[0].data);
        })
        .catch(err => console.log('err = ' + err));
    };

    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{
        marginBottom: 80
      }}>
      <View style={{padding: 10, alignItems: 'center'}}>
       <View>
        <Text style={{fontWeight: 'bold'}}>
          {dataUser.nisn} - {dataUser.nama_user}
        </Text>
       </View>

        <ItemNilai data={data} />
      </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

export default Nilai;
