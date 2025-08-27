const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/Student');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.post('/:id/sync', studentController.syncStudent);
router.post('/:id/email-disable', studentController.disableEmailReminders);
router.post('/:id/send-email', studentController.sendManualEmail);
router.get('/test/ids', studentController.getStudentIds);
module.exports = router;
