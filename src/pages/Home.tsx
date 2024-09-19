import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, 
  IonButton, IonIcon 
} from '@ionic/react';
import { scaleOutline } from 'ionicons/icons';
import { calculatorOutline } from 'ionicons/icons';
import './Home.css';

const Home : React.FC = () => {
  const [jenisMetrik, setJenisMetrik] = useState<string>('');
  const [satuanAwal, setSatuanAwal] = useState<string>('');
  const [satuanTujuan, setSatuanTujuan] = useState<string>('');
  const [nilaiInput, setNilaiInput] = useState<number | null>(null);
  const [hasilKonversi, setHasilKonversi] = useState<number | null>(null);
  const [daftarSatuan, setDaftarSatuan] = useState<string[]>([]);

  useEffect(() => {
    switch (jenisMetrik) {
      case 'panjang' :
        setDaftarSatuan(['Meter', 'Kilometer', 'Kaki', 'Mil']);
        break;
      case 'berat' :
        setDaftarSatuan(['Kilogram', 'Gram', 'Pound', 'Ons']);
        break;
      case 'suhu' :
        setDaftarSatuan(['Celsius', 'Fahrenheit', 'Kelvin']);
        break;
      case 'volume' :
        setDaftarSatuan(['Liter', 'Mililiter', 'Galon', 'Meter Kubik']);
        break;
      case 'luas' :
        setDaftarSatuan(['Meter Persegi', 'Kilometer Persegi', 'Hektar', 'Acre']);
        break;
      case 'kecepatan' :
        setDaftarSatuan(['Meter per Detik', 'Kilometer per Jam', 'Mil per Jam', 'Knot']);
        break;
      case 'tekanan' :
        setDaftarSatuan(['Pascal', 'Bar', 'Atmosfer', 'Psi']);
        break;
      case 'waktu' :
        setDaftarSatuan(['Detik', 'Menit', 'Jam', 'Hari']);
        break;
      default :
        setDaftarSatuan([]);
    }
    setSatuanAwal('');
    setSatuanTujuan('');
  }, [jenisMetrik]);

  const handleKonversi = () => {
    if (nilaiInput !== null && satuanAwal && satuanTujuan) {
      let hasil : number | null = null;

      switch (jenisMetrik) {
        case 'panjang' :
          hasil = konversiPanjang(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'berat' :
          hasil = konversiBerat(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'suhu' :
          hasil = konversiSuhu(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'volume' :
          hasil = konversiVolume(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'luas' :
          hasil = konversiLuas(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'kecepatan' :
          hasil = konversiKecepatan(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'tekanan' :
          hasil = konversiTekanan(nilaiInput, satuanAwal, satuanTujuan);
          break;
        case 'waktu' :
          hasil = konversiWaktu(nilaiInput, satuanAwal, satuanTujuan);
          break;
      }

      if (hasil !== null) {
        setHasilKonversi(Number.isInteger(hasil) ? Math.round(hasil)  : parseFloat(hasil.toFixed(2)));
      }
    }
  };

  const konversiPanjang = (nilai : number, dari : string, ke : string) : number => {
    const rasioPanjang : { [key : string] : number } = {
      Meter : 1,
      Kilometer : 1000,
      Kaki : 0.3048,
      Mil : 1609.34,
    };
    return (nilai * rasioPanjang[dari]) / rasioPanjang[ke];
  };

  const konversiBerat = (nilai : number, dari : string, ke : string) : number => {
    const rasioBerat : { [key : string] : number } = {
      Kilogram : 1,
      Gram : 0.001,
      Pound : 0.453592,
      Ons : 0.0283495,
    };
    return (nilai * rasioBerat[dari]) / rasioBerat[ke];
  };

  const konversiSuhu = (nilai : number, dari : string, ke : string) : number | null => {
    if (dari === 'Celsius' && ke === 'Fahrenheit') {
      return (nilai * 9) / 5 + 32;
    } else if (dari === 'Fahrenheit' && ke === 'Celsius') {
      return ((nilai - 32) * 5) / 9;
    } else if (dari === 'Celsius' && ke === 'Kelvin') {
      return nilai + 273.15;
    } else if (dari === 'Kelvin' && ke === 'Celsius') {
      return nilai - 273.15;
    } else if (dari === 'Fahrenheit' && ke === 'Kelvin') {
      return ((nilai - 32) * 5) / 9 + 273.15;
    } else if (dari === 'Kelvin' && ke === 'Fahrenheit') {
      return ((nilai - 273.15) * 9) / 5 + 32;
    }
    return nilai;
  };

  const konversiVolume = (nilai : number, dari : string, ke : string) : number => {
    const rasioVolume : { [key : string] : number } = {
      Liter : 1,
      Mililiter : 0.001,
      Galon : 3.78541,
      'Meter Kubik' : 1000,
    };
    return (nilai * rasioVolume[dari]) / rasioVolume[ke];
  };

  const konversiLuas = (nilai : number, dari : string, ke : string) : number => {
    const rasioLuas : { [key : string] : number } = {
      'Meter Persegi' : 1,
      'Kilometer Persegi' : 1e6,
      Hektar : 10000,
      Acre : 4046.86,
    };
    return (nilai * rasioLuas[dari]) / rasioLuas[ke];
  };

  const konversiKecepatan = (nilai : number, dari : string, ke : string) : number => {
    const rasioKecepatan : { [key : string] : number } = {
      'Meter per Detik' : 1,
      'Kilometer per Jam' : 0.277778,
      'Mil per Jam' : 0.44704,
      Knot : 0.514444,
    };
    return (nilai * rasioKecepatan[dari]) / rasioKecepatan[ke];
  };

  const konversiTekanan = (nilai : number, dari : string, ke : string) : number => {
    const rasioTekanan : { [key : string] : number } = {
      Pascal : 1,
      Bar : 1e5,
      Atmosfer : 101325,
      Psi : 6894.76,
    };
    return (nilai * rasioTekanan[dari]) / rasioTekanan[ke];
  };

  const konversiWaktu = (nilai : number, dari : string, ke : string) : number => {
    const rasioWaktu : { [key : string] : number } = {
      Detik : 1,
      Menit : 60,
      Jam : 3600,
      Hari : 86400,
    };
    return (nilai * rasioWaktu[dari]) / rasioWaktu[ke];
  };

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle className="header-title">
            <IonIcon icon={calculatorOutline} style={{ marginRight: '8px' }} /> 
            Metric Converter
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-container">
        <div className="center-wrapper">
          <strong><h2 className="credit-text">By : Ni Made Shavitri Mustikayani</h2></strong>
          <div className="converter-box">
            <IonItem className="input-item">
              <IonLabel position="stacked" className="input-label">Pilih Metrik</IonLabel>
              <IonSelect value={jenisMetrik} placeholder="Pilih Metrik" onIonChange={(e) => setJenisMetrik(e.detail.value)}>
                <IonSelectOption value="panjang">Panjang</IonSelectOption>
                <IonSelectOption value="berat">Berat</IonSelectOption>
                <IonSelectOption value="suhu">Suhu</IonSelectOption>
                <IonSelectOption value="volume">Volume</IonSelectOption>
                <IonSelectOption value="luas">Luas</IonSelectOption>
                <IonSelectOption value="kecepatan">Kecepatan</IonSelectOption>
                <IonSelectOption value="tekanan">Tekanan</IonSelectOption>
                <IonSelectOption value="waktu">Waktu</IonSelectOption>
              </IonSelect>
            </IonItem>

            <div className="from-to-container">
              <IonItem className="input-item from-item">
                <IonLabel position="stacked" className="input-label">Pilih Satuan  :</IonLabel>
                <IonSelect value={satuanAwal} placeholder="Dari" onIonChange={(e) => setSatuanAwal(e.detail.value)}>
                  {daftarSatuan.map((satuan) => (
                    <IonSelectOption key={satuan} value={satuan}>
                      {satuan}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem className="input-item to-item">
                <IonLabel position="stacked" className="input-label">Ke Satuan  :</IonLabel>
                <IonSelect value={satuanTujuan} placeholder="Ke" onIonChange={(e) => setSatuanTujuan(e.detail.value)}>
                  {daftarSatuan
                    .filter((satuan) => satuan !== satuanAwal)
                    .map((satuan) => (
                      <IonSelectOption key={satuan} value={satuan}>
                        {satuan}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>
            </div>

            <IonItem className="input-item">
              <IonLabel position="stacked" className="input-label">Masukkan Nilai</IonLabel>
              <IonInput
                type="number"
                placeholder="Masukkan Nilai"
                value={nilaiInput ?? ''}
                onIonChange={(e) => setNilaiInput(parseFloat(e.detail.value!))}
              />
            </IonItem>

            <IonButton className="convert-button" onClick={handleKonversi}>
              KONVERSI
            </IonButton>

            {hasilKonversi !== null && (
              <h3 className="result-text">
                Hasil : {hasilKonversi} {satuanTujuan}
              </h3>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
