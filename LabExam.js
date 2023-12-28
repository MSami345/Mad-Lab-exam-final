import React, { useEffect, useState } from "react";
import { app } from "./firebase";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";

import { getDatabase, ref, onValue, update } from "firebase/database";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const LabExam = () => {
  const [flagVal, setFlagVal] = useState(true);
  const [filter, setFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const countriesData = [
    {
      "Country Name": "Aruba",
      "Country Code": "ABW",
      Year: 1960,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Africa Eastern",
      "Country Code": "AFE",
      Year: 1960,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": 21125015452,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": 21125015452,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Afghanistan",
      "Country Code": "AFG",
      Year: 1961,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": 537777811.1,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": 537777811.1,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Africa Western, Central",
      "Country Code": "AFW",
      Year: 1960,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": 10447637853,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": 10447637853,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Angola",
      "Country Code": "AGO",
      Year: 1970,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Albania",
      "Country Code": "ALB",
      Year: 1970,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Andorra",
      "Country Code": "AND",
      Year: 1972,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Arab World",
      "Country Code": "ARB",
      Year: 1978,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "United Arab Emirates",
      "Country Code": "ARE",
      Year: 1990,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Argentina",
      "Country Code": "ARG",
      Year: 1998,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Armenia",
      "Country Code": "ARM",
      Year: 2000,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "American Samoa",
      "Country Code": "ASM",
      Year: 2001,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
    {
      "Country Name": "Antigua and Barbuda",
      "Country Code": "ATG",
      Year: 2010,
      "Personal Remittances (% of GDP)": null,
      "Unemployment (% of total labor force)": null,
      "GDP (current US$)_x": null,
      "GDP Growth (annual %)_x": null,
      "GDP (current US$)_y": null,
      "GDP Growth (annual %)_y": null,
    },
  ];

  const filteredCountries = countriesData.filter(
    (item) =>
      item["Country Name"].toLowerCase().indexOf(filter.toLowerCase()) !== -1 &&
      (yearFilter === "" || parseInt(yearFilter, 10) === item.Year)
  );

//   useEffect(() => {
//     // ReadData();
//   }, []);



//   const ReadData = () => {
//     const dbFS = getFirestore(app);
//     const snapshot = collection(dbFS, "people");
//     const q = query(snapshot, ref);
//     onSnapshot(q, (snapshot) => {
//       snapshot.docs.map((doc) => {
//         console.log("flag value is "+doc.data());
//         // setFlagVal(doc.data().flagValue);
//       });
//     });
//   };

const ReadData = () => {
    const dbFS = getFirestore();
    const snapshot = collection(dbFS, "FlagControl");
    const q = query(snapshot, ref);
    onSnapshot(q, (querySnapshot) => {
   
      querySnapshot.forEach((doc) => {
       
        // console.log("flag value is "+doc.data().flag)
        setFlagVal(doc.data().flag)
      });
   
    });
  };

  ReadData();

  return (
    <View style={{ flex: 1, top: 45 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "#0e3ead",
          opacity: 0.8,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          Countries Economic Growth
        </Text>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          flag value: {flagVal}
        </Text>
      </View>

      <Search filter={filter} setFilter={setFilter} />
      <FilterButton
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
      ></FilterButton>
      <View
        style={{
          width: "80%",
          height: 150,
          alignSelf: "center",
          borderWidth: 2,
          padding: 5,
        }}
      >
        <Image
          style={{ width: "80%", height: 130, alignSelf: "center" }}
          source={{
            uri: "https://cdn.howmuch.net/content/images/1600/final-world-map-economic-growth-2024-5c15.png",
          }}
        />
      </View>

      {flagVal == 1 && <DataTable data={filteredCountries}></DataTable>}
      {flagVal == 0 && <FlatListData data={filteredCountries}></FlatListData>}

      {/* <DataTable data={filteredCountries}></DataTable> */}
    </View>
  );
};

//reuseable component for search functionality
function Search({ filter, setFilter }) {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        height: 30,
        // alignContent: "flex-start",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 9, flexDirection: "row" }}>
          <TextInput
            value={filter}
            onChangeText={(t) => setFilter(t)}
            style={{
              borderWidth: 1,
              width: "100%",
              paddingLeft: 7,
              borderRadius: 5,
              height: 30,
            }}
            placeholder="Search Country"
          />
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png",
              }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

//function to show countries data in tabular form
const DataTable = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item["Country Name"]}</Text>
      <Text style={styles.cellYear}>{item["Year"]}</Text>
      <Text style={styles.cell}>{item["GDP (current US$)_x"]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "#0e3ead",
          opacity: 0.8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          Countries Data By Year
        </Text>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Country Name</Text>
        <Text style={styles.headerTextYear}>Year</Text>
        <Text style={styles.headerText}>GDP (current US$)_x</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item["Country Code"]}
      />
    </View>
  );
};

//function to show countries data in flatlist columns format
const FlatListData = ({ data }) => {
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        backgroundColor: "#839ae6",
        padding: 0,
        borderRadius: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
            paddingVertical: 8,
            color: "white",
          }}
        >
          Country Name
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
            paddingVertical: 8,
            color: "white",
          }}
        >
          Year
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            paddingVertical: 8,
            color: "white",
          }}
        >
          GDP (current US$)_x
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
            paddingVertical: 8,
            color: "white",
          }}
        >
          {item["Country Name"]}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
            paddingVertical: 8,
            color: "white",
          }}
        >
          {item["Year"]}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            paddingVertical: 8,
            color: "white",
          }}
        >
          {item["GDP (current US$)_x"]}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 0.8, padding: 16, backgroundColor: "#F5F5F5" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "#0e3ead",
          opacity: 0.8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          Countries Data By Year
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item["Country Code"]}
      />
    </View>
  );
};

//function to apply filter for year
function FilterButton({ yearFilter, setYearFilter }) {
  const [inputYear, setInputYear] = useState("");

  const handleInputChange = (text) => {
    setInputYear(text);
  };

  const handleSetYearFilter = () => {
    setYearFilter(inputYear);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        marginVertical: 15,
        width: "90%",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          borderRadius: 12,
          width: 80,
          height: 35,
        }}
      >
        <Text
          style={{
            padding: 8,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Year Filter
        </Text>
      </View>
      <TextInput
        placeholder="Enter year"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "slateblue",
          borderRadius: 5,
          padding: 8,
          flex: 1,
          width: 70,
          height: 35,
        }}
        value={inputYear}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity
        onPress={handleSetYearFilter}
        style={{
          padding: 7,
          backgroundColor: "slateblue",
          borderRadius: 5,
          width: 70,
          height: 35,
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", width: 60, height: 35 }}
        >
          Set Filter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setYearFilter("")}
        style={{
          padding: 7,
          backgroundColor: yearFilter === "" ? "green" : "blue",
          borderRadius: 5,
          width: 85,
          height: 35,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    padding: 10,
    backgroundColor: "#F5F5F5",
    top: 10,
    borderWidth: 2,
    margin: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "grey",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 2,
    paddingLeft: 2,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    width: "40%",
    color: "white",
  },
  headerTextYear: {
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 8,
  },
  cell: {
    width: "40%",
    fontSize: 16,
  },
  cellYear: {
    width: "20%",
    fontSize: 16,
  },
});

export default LabExam;
