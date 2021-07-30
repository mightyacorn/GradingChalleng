import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodaysMedication } from '../api';

const styles = StyleSheet.create({
  hr: {
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '80%',
    marginLeft: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    padding: 16,
    paddingVertical: 0,
    margin: 10,
    backgroundColor: 'white',
  },
  circleContainer: {
    flexDirection: 'row',
  },
  openCircle: {
    marginRight: 15,
    height: 15,
    width: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#F0F1F3'
  },
  openCircleLarge: {
    height: 42,
    width: 42,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16
  },
  filledCircle: {
    marginRight: 15,
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: '#EBEFFE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    height: 15,
    width: 15
  },
  medication: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'lightgray',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  medicationLast: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'lightgray',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  barContainer: {
    height: 10,
    width: '100%',
    backgroundColor: 'navajowhite'
  },
  buddy: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10
  },
  historyDay: {

  },
  morningHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  sun: {
    width: 20, 
    height: 20,
    marginTop: 12
  },
  medicationSun: {
    width: 20, 
    height: 20,
    marginLeft: 7
  },
  morningHeaderText: {
    marginLeft: 10
  },
  medicationHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10
  },
  fullSchedule: {
    color: "#2F48AD", 
    fontSize: 14, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tanTopBar: {
    backgroundColor: '#FFE2C1', 
    width: '100%', 
    height: 8,
    position: 'absolute',
    top: 0,
    left: 0
  },
  medicationInfo: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center'
  },
  medicationIcon: {
    height: 50,
    width: 50
  },
  whiteCheck: {
    height: 20,
    width: 20,
    marginLeft: 6
  },
  greenCheck: {
    height: 20,
    width: 20,
    marginRight: 4
  },
  takeMedsButton: {
    filter: 'drop-shadow(0px 2px 8px rgba(132, 146, 160, 0.48))',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 23
  },
  takeMedsButtonText: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14
  },
  medicationText: {
    marginLeft: 16
  },
  medicationTime: {
    color: '#959DA5',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  medicationType: {
    color: "#303030",
    fontSize: 16,
    fontWeight: 'bold'
  },
  medicationAmount: {
    color: "#303030",
    fontSize: 16,
  },
  asNeeded: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  asNeededText: {
    color: '#21B25A',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 14,
  },
  asNeededTextHeader: {
    color: '#303030',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  }
});

function TakeMeds () {

  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(false)
  const [taken, setTaken] = useState(0)

    // Call the getMedications function on render
    useEffect(() => {
      getMedications()
    }, [])

    // Get the medications from the "api"
    const getMedications = () => {
      setLoading(true)
      fetchTodaysMedication()
      .then(medications => setMedications(medications))
      .then(setLoading(false))
    }
    
    // Convert 24 hours time to 12 hour time 
    const timeConvert = (time) => {
      if(time > 12) {
        time = time -12
        return time
      } else return time
    }

    // Count of the medications that have been taken
    const countUp = () => {
      if(taken <= medications.length - 1) {
        setTaken(current => current += 1)
      } else return
    }

  return (
    <View style={styles.section}>
      <View style={styles.medicationHeader}>
        <Text style={{color: "#303030", fontWeight: "bold", fontSize: 20}}>Take your meds</Text>
        <Pressable>
          <Text style={styles.fullSchedule}>Full Schedule 
            <Image source={require('../assets/right-chevron.png')} style={{height: 18, width: 18, marginLeft: 4}}/>
          </Text>
        </Pressable>
      </View>
      <View style={styles.morningHeader}>
        <View style={styles.tanTopBar}></View>
        <Image source={require('../assets/sun.png')} style={styles.sun}/>
        <View style={styles.morningHeaderText}>
          <Text style={{color: "#303030", fontWeight: "bold", fontSize: 16, marginBottom: 4, marginTop: 12}}>Morning Medication</Text>
          <Text style={{color: "#959DA5", fontSize: 14, marginBottom: 8}}>6 routine meds</Text>
          {loading != true && 
          <View style={styles.circleContainer}>
          {medications.map((med, idx) => (
            idx <= taken - 1 ? <View style={styles.filledCircle } key={idx}>
              <Image source={require('../assets/check.png')} style={styles.checkmark}/>
            </View> : <View style={styles.openCircle} key={idx}></View>
          ))}
          </View>
          }
          
        </View>
        <View style={styles.openCircleLarge}>
          <Image source={require('../assets/up-chevron.png')} style={{height: 30, width: 30}}/>
        </View>
      </View>


      {loading != true ? medications.map((medication, idx) => (
      <View style={(idx == medications.length - 1 ? styles.medicationLast : styles.medication)} key={idx}>
        <View style={styles.medicationInfo}>
        <Image source={require('../assets/med.png')} style={styles.medicationIcon}/>
          <View style={styles.medicationText}>
            <Text style={styles.medicationTime}>{medication.dueTime > 12 ? timeConvert(medication.dueTime) + ':00 PM' : `${medication.dueTime}:00 AM`}
              <Image source={require('../assets/sun.png')} style={styles.medicationSun}/>
            </Text>
            <Text style={styles.medicationType}>{medication.name}</Text>
            <Text style={styles.medicationAmount}>Take {medication.dosage} {medication.dosageType}</Text>
          </View>
        </View>
        <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? '#21B25A' : '#5C7CFA'
          },
          styles.takeMedsButton
        ]} 
        onPress={()=> countUp()}>
          <Text style={styles.takeMedsButtonText}>Take
            <Image source={require('../assets/check-white.png')} style={styles.whiteCheck}/>
          </Text>
        </Pressable>
      </View>
      )): <Text>Loading...</Text>}
    </View>
  )
}

function AsNeeded () {
  return (
    <View style={styles.section}>
      <View style={styles.asNeeded}>
        <View>
          <Text style={styles.asNeededTextHeader}>As-needed medication</Text>
          <Text style={styles.asNeededText}>
            <Image source={require('../assets/check-green.png')} style={styles.greenCheck}/>
            3 of 5 meds okay to take
          </Text>
        </View>
        <Pressable>
          <Text style={{color: "#2F48AD", fontSize: 14}}>View</Text>
        </Pressable>
      </View>
    </View>
  )
}

function Rewards () {
  return (
    <View style={styles.section}>
      <Text>Earn Rewards</Text>
      <Button title="All Rewards" />
      <Text>80 Points</Text>
      <View style={styles.barContainer}>
        <View style={{ backgroundColor: 'orange', position: 'absolute', width: '20%', height: '100%' }} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.filledCircle} />
        <Text>5 Stars earned</Text>
        <Text>Open the app once a day</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.filledCircle} />
        <Text>15 Stars earned</Text>
        <Text>3 meds taken</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.openCircle} />
        <Text>0 Stars earned</Text>
        <Text>Daily health survey</Text>
      </View>
      <Text>Expand</Text>
    </View>
  )
}

function buddyItem ({item: buddy}) {
  return (
    <View key={buddy.id} style={styles.buddy}>
      <Image source={{uri: buddy.avatarUrl}} style={{ height: 40, width: 40 }} />
      <Text>{buddy.name}</Text>
      <Text>All-time adherence</Text>
      <Text>{String(buddy.adherence).slice(0, 2)}%</Text>
    </View>
  )
}

function Buddies () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'FETCH_BUDDIES' })
  }, [])
  const buddyList = useSelector(state => state.buddies)

  return (
    <View style={styles.section}>
      <Text>Check on buddies</Text>
      <Button title="All buddies" />
      <FlatList
        data={buddyList.slice(0,3)}
        renderItem={buddyItem}
        keyExtractor={buddy => String(buddy.id)}
      />
    </View>
  )
}

function RecentHistory () {
  return (
    <View style={styles.section}>
      <Text>Past 7 days</Text>
      <Button title="Medication history" />
      <Text>Medication Progress</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.historyDay}>
          <Text>Th</Text>
          <Text>12</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Fri</Text>
          <Text>13</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '100%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Sat</Text>
          <Text>14</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '100%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Sun</Text>
          <Text>15</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Mon</Text>
          <Text>16</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Tues</Text>
          <Text>17</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Wed</Text>
          <Text>18</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
      </View>
    </View>
  )
}

function DashboardScreen () {
  return (
    <ScrollView style={{backgroundColor: "#fff"}}>
      <TakeMeds />
      <AsNeeded />
      <View style={styles.hr} />
      <Rewards />
      <View style={styles.hr} />
      <Buddies />
      <View style={styles.hr} />
      <RecentHistory />
    </ScrollView>
  );
}

export default DashboardScreen