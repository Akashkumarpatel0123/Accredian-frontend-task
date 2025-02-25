import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Correct API URL for Render backend
const API_URL = "https://accredian-backend-task-4pe7.onrender.com";

const ReferEarn = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ referrer: "", referee: "" });
  const [referrals, setReferrals] = useState([]);

  // ✅ Fetch Referrals from Backend
  useEffect(() => {
    axios.get(`${API_URL}/get-referrals`)
      .then((response) => setReferrals(response.data))
      .catch((error) => console.error("Error fetching referrals:", error));
  }, []);

  // ✅ Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Referral to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add-referral`, formData);
      alert("Referral Submitted Successfully!");
      setShow(false);
      setFormData({ referrer: "", referee: "" });
      window.location.reload(); // Refresh list
    } catch (error) {
      console.error("Referral Submission Error:", error);
      alert("Error submitting referral");
    }
  };

  return (
    <div className="container text-center">
      <h1>Refer & Earn</h1>
      <Button variant="primary" onClick={() => setShow(true)}>Refer Now</Button>

      {/* ✅ Referral Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Refer a Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" name="referrer" value={formData.referrer} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Friend's Email</Form.Label>
              <Form.Control type="email" name="referee" value={formData.referee} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="success">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✅ Display Referrals */}
      <h3 className="mt-4">Referral List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Referrer</th>
            <th>Referee</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {referrals.length > 0 ? (
            referrals.map((ref, index) => (
              <tr key={ref.id}>
                <td>{index + 1}</td>
                <td>{ref.referrer}</td>
                <td>{ref.referee}</td>
                <td>{new Date(ref.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No referrals found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ReferEarn;
