const Newspaper = require('./../models/newspaperModel');

exports.getAllNewspapers = async (req, res) => {
  try {
    // BUILD QUERY

    // // 1) Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // 2) Advanced filtering
    // let queryStr = JSON.stringify(queryObj);
    // // console.log(queryStr);
    // console.log(req.params);
    // console.log(req.key);
    console.log(req.query);

    const regex = new RegExp(req.query.title, 'i');

    const query = Newspaper.find({
      title: regex,
    });

    // const query = Newspaper.find({ title: 'aa' });

    // const query = Newspaper.find({
    //   title: /orgi/i,
    // });

    // EXECUTE QUERY
    const newspapers = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: newspapers.length,
      data: {
        newspapers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getNewspaper = async (req, res) => {
  try {
    const newspaper = await Newspaper.findById(req.params.id);
    res.status(200).json({ status: 'success', message: newspaper });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.createNewspaper = async (req, res) => {
  try {
    const newNewspaper = await Newspaper.create(req.body);
    res.status(201).json({ status: 'success', data: { newspaper: newNewspaper } });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateNewspaper = async (req, res) => {
  try {
    const newspaper = await Newspaper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        newspaper,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.deleteNewspaper = async (req, res) => {
  try {
    await Newspaper.findByIdAndDelete(req.params.id);
    res.status(204).json({
      statuts: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.searchTitle = async (req, res) => {
  try {
    const newspaper = await Newspaper.find({ title: req.params.term });
    res.status(200).json({ status: 'success', message: newspaper });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
