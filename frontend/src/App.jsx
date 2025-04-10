import { useState } from 'react'

const FamilyMemberForm = ({ index, member, onChange }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Family Member {index + 1}</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Native City</label>
            <input
              type="text"
              value={member.native_city || ''}
              onChange={(e) => onChange(index, 'native_city', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Native State</label>
            <input
              type="text"
              value={member.native_state || ''}
              onChange={(e) => onChange(index, 'native_state', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [memberCount, setMemberCount] = useState("")
  const [familyMembers, setFamilyMembers] = useState([])

  // Reset form after successful submission
  const resetForm = () => {
    setMemberCount("")
    setFamilyMembers([])
  }

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value) || 0
    setMemberCount(count)
    
    // Adjust the familyMembers array based on the new count
    if (count > familyMembers.length) {
      setFamilyMembers([
        ...familyMembers,
        ...Array(count - familyMembers.length).fill({ native_city: '', native_state: '' })
      ])
    } else {
      setFamilyMembers(familyMembers.slice(0, count))
    }
  }

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...familyMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFamilyMembers(updatedMembers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/family-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ familyMembers }),
      })
      
      if (response.ok) {
        alert('Form submitted successfully!')
        resetForm()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Family Information Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Family Members
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={memberCount}
                      onChange={handleMemberCountChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  
                  {memberCount > 0 && familyMembers.map((member, index) => (
                    <FamilyMemberForm
                      key={index}
                      index={index}
                      member={member}
                      onChange={handleMemberChange}
                    />
                  ))}
                  
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App