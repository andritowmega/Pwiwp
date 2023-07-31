
class TestingController {
  static async GetAll(req, res) {

    const data = await tableTestModel.get(req.params.slug).catch((err) => {
      console.error("TESTING CONTROLLER - can not get all project", err);
      return null;
    });
    if (data) {
      res.render("testing/index", { data: data, session: null });
    } else {
      res.render("testing/index", { data: null, session: null });
    }
  }
}

module.exports = TestingController;
