const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company_id: String, // kampanya id
  position: {
    //pozisyon
    type: String,
    required: true,
  },
  description: {
    //İlan açıklamasında sakıncalı kelime bulunmaması (2 point)
    //ilan açıklaması
    type: String,
    required: true,
  },
  deadline: {
    //ilanın yayında kalma süresi
    type: Number,
    default: Date.now() + 15 * 24 * 60 * 60 * 1000, //İlanın yayında kalma süresi yayınladığı tarihten 15 gün sonrası olarak kaydedilir.
  },
  quality: {
    //ilan kalitesi
    type: Number,
  },
  sidebenefit: String, //yan haklar +1 point
  workingType: String, //çalışma türü +1 point
  salary: String, //ücret bilgisi +1 point
});

module.exports = mongoose.model("job", JobSchema);
