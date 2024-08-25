### School Apis

## 1 : Add School

- Endpoint Uri :
  https://schools-api-with-location-calculation.vercel.app/api/addSchool
  Method : POST
  Example Data provide to this Api : body JSON
  {
  "name": "Riverbend Elementary",
  "address": "951 Maple Avenue",
  "latitude": 34.0522,
  "longitude": -118.2437
  }


## 2 : List Schools With Sort by nearest location

- Endpoint Uri :
  https://schools-api-with-location-calculation.vercel.app/api/listSchools?latitude=36.1699&longitude=-115.1398
  Method : GET

- The latitude=36.1699&longitude=-115.1398 are Parameters need to provide in uri this are the user's coordinates
