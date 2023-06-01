
const meetService = require('./service');


const getMeeting = (req, res, next) => {
  let id = req.params.id;
  console.log('IZD',id);

 
  meetService.getMeeting(id)
    .then((meet) => meet ? res.json(meet) : res.sendStatus(404))
    .catch((err) => next(err));
};


const createMeeting = async (req, res, next) => {
 
  meetService.createMeeting(req.body)
    .then((meet) => {
      if (meet.error) {
        res.status(500).send(meet);
      } else {
        res.json(meet)
      }
    })
    .catch((err) => next(err));
};


const updateMeeting = async (req, res, next) => {

  meetService.updateMeeting(req.body, req.params.id)
    .then((meet) => {
      if (meet.error) {
        res.status(500).send(meet);
      } else {
        res.json(meet)
      }
    })
    .catch((err) => next(err));
};

const deleteMeeting = async (req, res, next) => {

  meetService.deleteMeeting(req.params.id)
    .then((meet) => {
      if (meet.error) {
        res.status(500).send(meet);
      } else {
        res.json(meet)
      }
    })
    .catch((err) => next(err));
};



module.exports = {
  getMeeting,
  createMeeting,
  updateMeeting,
  deleteMeeting
};
