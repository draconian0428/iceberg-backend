import express, { Request, Response } from 'express';
import BaseNFT from '../models/BaseNFTs.model';
import { myNFTCollection } from '../models/CustomNFTs.model';
const app = express();

// ============================
//  Get All Base NFTs
// ============================
app.get('/getnfts', async (req: Request, res: Response) => {
  const result = await BaseNFT.find();
  if (!result) {
    res.status(500).json({
      ok: false,
    })
  }

  res.json({
    ok: true,
    nfts: result,
  });
});

// ============================
//  Get base_nft by id
// ============================
app.post('/getnft', async (req: Request, res: Response) => {

  const result = await BaseNFT.findById(req.body._id);

  if (!result) {
    res.status(500).json({
      ok: false
    })
  }

  res.status(200).json({
    ok: true,
    nft: result
  })
});

// ============================
//  Create a new custom nft
// ============================
app.post('/createmynft', async (req: Request, res: Response) => {

  if (!req.body.uName) {
    return res.status(500).json({
      err: 'User name is not defined'
    })
  }
  const CustomNFTModel = myNFTCollection(req.body.uName);

  console.log({
    bId: req.body.bId,
    name: req.body.name,
    value: req.body.value,
    info: req.body.info,  
  })

  let newNFT = new CustomNFTModel({
    bId: req.body.bId,
    name: req.body.name,
    value: req.body.value,
    info: req.body.info,
  });

  newNFT.save().then(nfts => {
    return res.status(200).json({
      ok: true,
      nft: nfts,
    })
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      err
    })
  })
});


// ============================
//  Get All Custom NFTs
// ============================
app.post('/getmynfts', async (req: Request, res: Response) => {

  if (!req.body.uName) {
    return res.status(500).json({
      err: 'User name is not defined'
    })
  }
  const CustomNFTModel = myNFTCollection(req.body.uName);

  const result = await CustomNFTModel.find().populate([
    {
      path: 'bId',
    }
  ]);
  if (!result) {
    res.status(500).json({
      ok: false,
    })
  }

  res.json({
    ok: true,
    nfts: result,
  });
});

export default app;