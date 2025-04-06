import torch
print(torch.__version__)            # e.g. 2.6.0
print(torch.version.cuda)           # e.g. '11.8'
print(torch.cuda.is_available())    # should be True
