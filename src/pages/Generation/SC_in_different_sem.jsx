import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SC_in_different_sem = () => {
  const [programNames, setProgramNames] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState('');
  const [selectedPractical, setSelectedPractical] = useState('');
  const [selectedTotalMods, setSelectedTotalMods] = useState('');
  const [selectedWeeklyHours, setSelectedWeeklyHours] = useState('');
  const [selectedSemester, setSelectedSemester] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCredit, setSelectedCredit] = useState('');
  const [tableData, setTableData] = useState([]);

  const columns=["CourseID","CourseName","CourseCode","CourseLecture","CourseTutorial","CoursePractical","CourseCredits","WklyHrs"];

  useEffect(() => {
    const fetchProgramNames = async () => {
      try {
        const response = await axios.get('http://localhost/test/SCSD/scsd_read_program.php');
        const names = response.data.map(item => item.Programme_Name);
        setProgramNames(names);
      } catch (error) {
        console.error('Error fetching program names:', error);
      }
    };

    const fetchCourseTypes = async () => {
      try {
        const response = await axios.get('http://localhost/test/SCSD/scsd_read_coursetype.php');
        const types = response.data.map(item => item.CourseTypeName);
        setCourseTypes(types);
      } catch (error) {
        console.error('Error fetching course types:', error);
      }
    };

    const fetchData = () => {
    
      axios.get('http://localhost/test/SCSD/scsd_read_course.php')
        .then(response => {
          setTableData(response.data); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
    fetchProgramNames();
    fetchCourseTypes();
  }, []);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleCourseTypeChange = (event) => {
    setSelectedCourseType(event.target.value);
  };

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleLectureChange = (event) => {
    setSelectedLecture(event.target.value);
  };

  const handleTutorialChange = (event) => {
    setSelectedTutorial(event.target.value);
  };

  const handlePracticalChange = (event) => {
    setSelectedPractical(event.target.value);
  };

  const handleTotalModsChange = (event) => {
    setSelectedTotalMods(event.target.value);
  };

  const handleWeeklyHoursChange = (event) => {
    setSelectedWeeklyHours(event.target.value);
  };

  const handleSemesterChange = (event) => {
    const semester = event.target.value;
    if (selectedSemester.includes(semester)) {
      setSelectedSemester(selectedSemester.filter(item => item !== semester));
    } else {
      setSelectedSemester([...selectedSemester, semester]);
    }
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedSemester.length < 2) {
      alert('Please select at least 2 semesters.');
    }
    sendDataToPhp(selectedProgram, selectedCourseType, courseName, selectedSlot, selectedLecture, selectedTutorial, selectedPractical, selectedTotalMods, selectedWeeklyHours, selectedSemester, selectedDepartment);
  };

  const handleCreditChange = (event) => {
    setSelectedCredit(event.target.value);
  };

  const sendDataToPhp = (selectedProgram, selectedCourseType, courseName, selectedSlot, selectedLecture, selectedTutorial, selectedPractical, selectedTotalMods, selectedWeeklyHours, selectedSemester, selectedDepartment) => {
    const data = {
      selectedProgram,
      selectedCourseType,
      courseName,
      selectedSlot,
      selectedLecture,
      selectedTutorial,
      selectedPractical,
      selectedTotalMods,
      selectedWeeklyHours,
      selectedSemester,
      selectedDepartment,
      selectedCredit
    };

    axios.post('http://localhost/test/SCSD/sc_ms_1.1.php', data)
      .then(response => {        
        console.log('Data sent successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error sending data to PHP:', error);
      });
    
  };

  return (
    /*    
    <div className="container">
    <div className="header">          
      <Link to="/code-gen"><button className="home-button">Go back to Code Generation Page</button></Link>
      <Link to="/"><button className="home-button">Go back to Home Page</button></Link>
    </div>
    <center><h2>Single-course offered to different semesters</h2></center>
  
    <div className="form-container">
      <div className='select'>
      <div className="form-field">
        <label htmlFor="programDropdown">Select a program:</label>
        <select id="programDropdown" value={selectedProgram} onChange={handleProgramChange}>
          <option value="">Select a program</option>
          {programNames.map(program => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="courseTypeDropdown">Select a course type:</label>
        <select id="courseTypeDropdown" value={selectedCourseType} onChange={handleCourseTypeChange}>
          <option value="">Select a course type</option>
          {courseTypes.map(courseType => (
            <option key={courseType} value={courseType}>{courseType}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="courseNameInput">Course Name:</label>
        <input
          className='scsd_input'
          id="courseNameInput"
          type="text"
          value={courseName}
          onChange={handleCourseNameChange}
        />
      </div>
      </div>
  
      <div className='select'>
      <div className="form-field">
        <label htmlFor="slotDropdown">Select a slot:</label>
        <select id="slotDropdown" value={selectedSlot} onChange={handleSlotChange}>
          <option value="">Select a slot</option>
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M', 'S', 'T', 'U', 'V', 'W'].map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="lectureDropdown">Select a lecture:</label>
        <select id="lectureDropdown" value={selectedLecture} onChange={handleLectureChange}>
          <option value="">Select a lecture</option>
          {[0, 1, 2, 3, 4, 5, 6].map(lecture => (
            <option key={lecture} value={lecture}>{lecture}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="tutorialDropdown">Select a tutorial:</label>
        <select id="tutorialDropdown" value={selectedTutorial} onChange={handleTutorialChange}>
          <option value="">Select a tutorial</option>
          {[0, 1, 2, 3, 4, 5, 6].map(tutorial => (
            <option key={tutorial} value={tutorial}>{tutorial}</option>
          ))}
        </select>
      </div>
      </div>
  
      <div className='select'>
      <div className="form-field">
        <label htmlFor="practicalDropdown">Select a practical:</label>
        <select id="practicalDropdown" value={selectedPractical} onChange={handlePracticalChange}>
          <option value="">Select a practical</option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(practical => (
            <option key={practical} value={practical}>{practical}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="totalModsDropdown">Total Mods:</label>
        <select id="totalModsDropdown" value={selectedTotalMods} onChange={handleTotalModsChange}>
          <option value="">Select total mods</option>
          {[0, 1, 2, 3, 4, 5, 6].map(totalMods => (
            <option key={totalMods} value={totalMods}>{totalMods}</option>
          ))}
        </select>
      </div>
  
      <div className="form-field">
        <label htmlFor="weeklyHoursDropdown">Weekly Hours:</label>
        <select id="weeklyHoursDropdown" value={selectedWeeklyHours} onChange={handleWeeklyHoursChange}>
          <option value="">Select weekly hours</option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(hours => (
            <option key={hours} value={hours}>{hours}</option>
          ))}
        </select>
      </div>
      </div>
  
      <div className='select'>
      <div className="form-field">
        <label>Choose Semesters:</label>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => (
          <div key={semester}>
            <input
              type="checkbox"
              value={`S${semester}`}
              checked={selectedSemester.includes(`S${semester}`)}
              onChange={handleSemesterChange}
            />
            <label htmlFor={`semester${semester}`}>{`S${semester}`}</label>
          </div>
        ))}
      </div>
  
      <div className="form-field">
        <span>Offering Department:</span>
        {['IT', 'ME', 'AE', 'CE', 'CH', 'CS', 'EC', 'EE', 'EN', 'ES', 'MA', 'PH', 'PE', 'AD'].map(department => (
          <label key={department}>
            <input
              type="radio"
              value={department}
              checked={selectedDepartment === department}
              onChange={handleDepartmentChange}
            />
            {department}
          </label>
        ))}
      </div>
      
  
      <div className="form-field dropdown">
        <label htmlFor="creditDropdown">Credit:</label>
        <select id="creditDropdown" value={selectedCredit} onChange={handleCreditChange}>
          <option value="">Select credit</option>
          {[...Array(9).keys()].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      </div>
    </div>
  
    <center>
      <button  className='home-button' onClick={handleSubmit}>Submit</button>
    </center>

    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  */
  <div className="container">
  <div className="header">
    <Link to="/code-gen"><button className="home-button">Go back to Code Generation Page</button></Link>
    <Link to="/"><button className="home-button">Go back to Home Page</button></Link>
  </div>
  <center><h2>Single-course offered to different semesters</h2></center>

  <div className="form-container">
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className='select'>
        <div className="form-field">
          <label htmlFor="programDropdown">Select a program:</label>
          <select id="programDropdown" value={selectedProgram} onChange={handleProgramChange} required>
            <option value="">Select a program</option>
            {programNames.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="courseTypeDropdown">Select a course type:</label>
          <select id="courseTypeDropdown" value={selectedCourseType} onChange={handleCourseTypeChange} required>
            <option value="">Select a course type</option>
            {courseTypes.map(courseType => (
              <option key={courseType} value={courseType}>{courseType}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="courseNameInput">Course Name:</label>
          <input
            className='scsd_input'
            id="courseNameInput"
            type="text"
            value={courseName}
            onChange={handleCourseNameChange}
            required
          />
        </div>
      </div>

      <div className='select'>
        <div className="form-field">
          <label htmlFor="slotDropdown">Select a slot:</label>
          <select id="slotDropdown" value={selectedSlot} onChange={handleSlotChange} required>
            <option value="">Select a slot</option>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M', 'S', 'T', 'U', 'V', 'W'].map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="lectureDropdown">Select the number of lecture hours :</label>
          <select id="lectureDropdown" value={selectedLecture} onChange={handleLectureChange} required>
            <option value="">Select the number of lecture hours :</option>
            {[0, 1, 2, 3, 4, 5, 6].map(lecture => (
              <option key={lecture} value={lecture}>{lecture}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tutorialDropdown">Select the number of tutorial hours:</label>
          <select id="tutorialDropdown" value={selectedTutorial} onChange={handleTutorialChange} required>
            <option value="">Select the number of tutorial hours:</option>
            {[0, 1, 2, 3, 4, 5, 6].map(tutorial => (
              <option key={tutorial} value={tutorial}>{tutorial}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='select'>
        <div className="form-field">
          <label htmlFor="practicalDropdown">Select the number of practical hours</label>
          <select id="practicalDropdown" value={selectedPractical} onChange={handlePracticalChange} required>
            <option value="">Select the number of practical hours</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(practical => (
              <option key={practical} value={practical}>{practical}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="totalModsDropdown">Total Mods:</label>
          <select id="totalModsDropdown" value={selectedTotalMods} onChange={handleTotalModsChange} required>
            <option value="">Select total mods</option>
            {[0, 1, 2, 3, 4, 5, 6].map(totalMods => (
              <option key={totalMods} value={totalMods}>{totalMods}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="weeklyHoursDropdown">Weekly Hours:</label>
          <select id="weeklyHoursDropdown" value={selectedWeeklyHours} onChange={handleWeeklyHoursChange} required>
            <option value="">Select weekly hours</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(hours => (
              <option key={hours} value={hours}>{hours}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='select'>
        <div className="form-field">
          <label>Choose Semesters:</label>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => (
            <div key={semester}>
              <input
                type="checkbox"
                id={`semester${semester}`}
                value={`S${semester}`}
                checked={selectedSemester.includes(`S${semester}`)}
                onChange={handleSemesterChange}
              />
              <label htmlFor={`semester${semester}`}>{`S${semester}`}</label>
            </div>
          ))}
        </div>

        <div className="form-field">
          <span>Offering Department:</span>
          {['IT', 'ME', 'AE', 'CE', 'CH', 'CS', 'EC', 'EE', 'EN', 'ES', 'MA', 'PH', 'PE', 'AD'].map(department => (
            <label key={department}>
              <input
                type="radio"
                id={`offeringDepartment${department}`}
                name="offeringDepartment"
                value={department}
                checked={selectedDepartment === department}
                onChange={handleDepartmentChange}
                required
              />
              <label htmlFor={`offeringDepartment${department}`}>{department}</label>
            </label>
          ))}
        </div>
      </div>

      <div className='select'>
        <div className="form-field dropdown">
          <label htmlFor="creditDropdown">Credit:</label>
          <select id="creditDropdown" value={selectedCredit} onChange={handleCreditChange} required>
            <option value="">Select credit</option>
            {[...Array(9).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>        
      </div>

      <center>
        <button className='home-button' type="submit">Submit</button>
      </center>
    </form>
  </div>

  <div className="table-container">
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


  );
};

export default SC_in_different_sem;
