import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  panAadhar: { type: String },
  residence: { type: String },
  age: { type: Number },
});

const assetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Bank Accounts', 'Insurance Policies', 'Stocks', 'Mutual Funds', 'Jewellery', 'House', 'Land']
  },
  beneficiaryName: { type: String, required: true },
  share: { type: Number, required: true },
  field1_label: String,
  field1_value: String,
  field2_label: String,
  field2_value: String,
  field3_label: String,
  field3_value: String,
});

const executorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String },
    address: { type: String, required: true },
    isAlternate: { type: Boolean, default: false }
});

const willSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Last Will and Testament' },
  testator: {
    name: String,
    fatherName: String,
    address: String,
    date: { type: Date, default: Date.now }
  },
  beneficiaries: [beneficiarySchema],
  assets: [assetSchema],
  guardian: {
    name: String,
    relation: String,
    childrenNames: { type: String }
  },
  executors: [executorSchema],
  residueClause: {
    beneficiaryName: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Will', willSchema);